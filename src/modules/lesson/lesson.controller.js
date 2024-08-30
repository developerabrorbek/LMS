import { isValidObjectId } from "mongoose";
import { Lesson } from "./lesson.model.js";
import Group from "../group/group.model.js";
import { BadRequestException } from "../../exceptions/bad-request.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import ApiFeature from "../../utils/api-feature.utils.js";

class LessonController {
  #_model;
  #_groupModel;

  constructor() {
    this.#_model = Lesson;
    this.#_groupModel = Group;
  }

  createLesson = async (req, res, next) => {
    try {
      const { name, groupId } = req.body;

      // CHECK GROUP ID to object ID
      this.#_checkObjectId(groupId);

      // Check group if exists
      await this.#_checkGroup(groupId);

      // Creating new lesson
      await this.#_model.create({
        name,
        group: groupId,
      });

      res.status(201).send({
        message: "Lesson created",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllLessons = async (req, res, next) => {
    try {
      const query = { ...req.query };

      // GET ALL FILTERED LESSONS COUNT
      const allResultsCount = await new ApiFeature(this.#_model.find(), query)
        .filter()
        .sort("createdAt")
        .limitFields()
        .getQuery()
        .countDocuments();

      // EXECUTE QUERY
      const allFilteredLessons = await new ApiFeature(
        this.#_model.find(),
        query
      )
        .filter()
        .sort("createdAt")
        .limitFields()
        .paginate()
        .getQuery()
        .populate([{ path: "videos" }, { path: "group" }])
        .select("-__v");

      res.send({
        message: "success",
        page: req.query?.page || 0,
        limit: req.query?.limit || 10,
        results: allResultsCount,
        data: allFilteredLessons,
      });
    } catch (error) {
      next(error);
    }
  };

  updateLesson = async (req, res, next) => {
    try {
      const { name } = req.body;
      const { lessonId } = req.params;

      // Check object id
      this.#_checkObjectId(lessonId);

      // Check lesson if exists
      await this.#_checkLesson(lessonId);

      // update lesson
      await this.#_model.findByIdAndUpdate(lessonId, {
        name,
      });

      res.send({
        message: "Lesson updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteLesson = async (req, res, next) => {
    try {
      const { lessonId } = req.params;

      // Check object id
      this.#_checkObjectId(lessonId);

      // delete lesson
      await this.#_model.findByIdAndDelete(lessonId);

      res.send({
        message: "Lesson deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  #_checkObjectId = (id) => {
    if (!isValidObjectId(id)) {
      throw BadRequestException(`Given id: ${id} is not a valid object id`);
    }
  };

  #_checkGroup = async (groupId) => {
    const foundedGroup = await this.#_groupModel.findById(groupId);

    if (!foundedGroup) {
      throw new NotFoundException("Group not found");
    }
  };

  #_checkLesson = async (lessonId) => {
    const foundedLesson = await this.#_model.findById(lessonId);

    if (!foundedLesson) {
      throw new NotFoundException("Lesson not found");
    }
  };
}

export default new LessonController();
