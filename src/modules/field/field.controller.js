import { isValidObjectId } from "mongoose";
import Field from "./field.model.js";
import ApiFeature from "../../utils/api-feature.utils.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";

class FieldController {
  #_model;

  constructor() {
    this.#_model = Field;
  }

  createField = async (req, res, next) => {
    try {
      const { name, parentId } = req.body;

      if (parentId) {
        this.#_checkObjectId(parentId);

        await this.#_checkField(parentId);
      }

      const newField = await this.#_model.create({
        name,
        parentField: parentId,
      });

      if (parentId) {
        await this.#_model.findByIdAndUpdate(parentId, {
          $push: {
            childFields: newField.id,
          },
        });
      }

      res.status(201).send({
        message: "Successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllFields = async (req, res, next) => {
    try {
      const query = { ...req.query };

      // GET ALL FILTERED PRODUCTS COUNT
      const allResultsCount = await new ApiFeature(this.#_model.find(), query)
        .filter()
        .sort("name")
        .limitFields()
        .getQuery()
        .countDocuments();

      // EXECUTE QUERY
      const allFilteredFields = await new ApiFeature(this.#_model.find(), query)
        .filter()
        .sort("name")
        .limitFields()
        .paginate()
        .getQuery()
        .populate("parentField")
        .populate("childFields")
        .populate("groups")
        .select("-__v");

      res.send({
        message: "success",
        page: req.query?.page || 0,
        limit: req.query?.limit || 10,
        results: allResultsCount,
        data: allFilteredFields,
      });
    } catch (error) {
      next(error);
    }
  };

  updateField = async (req, res, next) => {
    try {
      const { name } = req.body;
      const { fieldId } = req.params;

      this.#_checkObjectId(fieldId);

      await this.#_model.findByIdAndUpdate(fieldId, {
        name,
      });

      res.send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteField = async (req, res, next) => {
    try {
      const { fieldId } = req.params;

      this.#_checkObjectId(fieldId);

      await this.#_model.findByIdAndDelete(fieldId);

      res.send({
        message: "successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };

  #_checkObjectId(id) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Given ${id} is not a valid ObjectID`);
    }
  }

  async #_checkField(fieldId) {
    const foundedField = await this.#_model.findById(fieldId);

    if (!foundedField) {
      throw new NotFoundException("Field not found");
    }
  }
}

export default new FieldController();
