import { isValidObjectId } from "mongoose";
import ApiFeature from "../../utils/api-feature.utils.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { BadRequestException } from "../../exceptions/bad-request.exception.js";
import Class from "../class/class.model.js";
import Field from "../field/field.model.js";
import Group from "../group/group.model.js";
import User from "../user/user.model.js";
import { verifyToken } from "../../helper/jwt.helper.js";

class GroupController {
  #_model;
  #_fieldModel;
  #_classModel;
  #_userModel;

  constructor() {
    this.#_model = Group;
    this.#_fieldModel = Field;
    this.#_classModel = Class;
    this.#_userModel = User;
  }

  createGroup = async (req, res, next) => {
    try {
      const { name, classId, fieldId, students } = req.body;

      await this.#_checkClassById(classId);

      await this.#_checkFieldById(fieldId);

      if (students?.length) {
        for (let st of students) {
          this.#_checkObjectId(st);
        }
      }

      const newGroup = await this.#_model.create({
        name,
        class: classId,
        field: fieldId,
        students: students?.length ? students : [],
      });

      for (let st of students) {
        await this.#_userModel.findByIdAndUpdate(st, {
          $push: {
            groups: newGroup.id,
          },
        });
      }

      await this.#_classModel.findByIdAndUpdate(classId, {
        $push: {
          groups: newGroup.id,
        },
      });

      await this.#_fieldModel.findByIdAndUpdate(fieldId, {
        $push: {
          groups: newGroup.id,
        },
      });

      res.status(201).send({
        message: "Successfully created",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllGroups = async (req, res, next) => {
    try {
      const query = { ...req.query };

      // GET ALL FILTERED Group COUNT
      const allResultsCount = await new ApiFeature(this.#_model.find(), query)
        .filter()
        .sort("createdAt")
        .limitFields()
        .getQuery()
        .countDocuments();

      // EXECUTE QUERY
      const allFilteredGroups = await new ApiFeature(this.#_model.find(), query)
        .filter()
        .sort("createdAt")
        .limitFields()
        .paginate()
        .getQuery()
        .populate([
          { path: "field", select: "name" },
          { path: "class", select: "name size" },
          { path: "students", select: "first_name last_name phone birthDate" },
        ])
        .select("-__v");

      res.send({
        message: "success",
        page: req.query?.page || 0,
        limit: req.query?.limit || 10,
        results: allResultsCount,
        data: allFilteredGroups,
      });
    } catch (error) {
      next(error);
    }
  };

  updateGroup = async (req, res, next) => {
    try {
      const { name, students, classId } = req.body;
      const { groupId } = req.params;

      this.#_checkObjectId(groupId);

      await this.#_model.findByIdAndUpdate(groupId, {
        name,
        class: classId,
        $set: {
          students,
        },
      });

      res.send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteGroup = async (req, res, next) => {
    try {
      const { groupId } = req.params;

      this.#_checkObjectId(groupId);

      await this.#_model.findByIdAndDelete(groupId);

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

  async #_checkClassById(classId) {
    const foundedClass = await this.#_classModel.findById(classId);

    if (!foundedClass) {
      throw new NotFoundException("Class not found");
    }
  }

  async #_checkFieldById(field) {
    const foundedField = await this.#_fieldModel.findById(field);

    if (!foundedField) {
      throw new NotFoundException("Class not found");
    }
  }
}

export default new GroupController();
