import { isValidObjectId } from "mongoose";
import ApiFeature from "../utils/api-feature.utils.js";
import Class from "../models/class.model.js";

class ClassController {
  #_model;

  constructor() {
    this.#_model = Class;
  }

  createClass = async (req, res, next) => {
    try {
      const { name, size } = req.body;

      await this.#_model.create({
        name,
        size,
      });

      res.status(201).send({
        message: "Successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllClasses = async (req, res, next) => {
    try {
      const query = { ...req.query };

      // GET ALL FILTERED Classes COUNT
      const allResultsCount = await new ApiFeature(this.#_model.find(), query)
        .filter()
        .sort("name")
        .limitFields()
        .getQuery()
        .countDocuments();

      // EXECUTE QUERY
      const allFilteredClasses = await new ApiFeature(
        this.#_model.find(),
        query
      )
        .filter()
        .sort("name")
        .limitFields()
        .paginate()
        .getQuery()
        .populate("groups")
        .select("-__v");

      res.send({
        message: "success",
        page: req.query?.page || 0,
        limit: req.query?.limit || 10,
        results: allResultsCount,
        data: allFilteredClasses,
      });
    } catch (error) {
      next(error);
    }
  };

  updateClass = async (req, res, next) => {
    try {
      const { name, size } = req.body;
      const { classId } = req.params;

      this.#_checkObjectId(classId);

      await this.#_model.findByIdAndUpdate(classId, {
        name,
        size,
      });

      res.send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteClass = async (req, res, next) => {
    try {
      const { classId } = req.params;

      this.#_checkObjectId(classId);

      await this.#_model.findByIdAndDelete(classId);

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
}

export default new ClassController();
