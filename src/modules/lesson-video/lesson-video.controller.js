import { isValidObjectId } from "mongoose";
import { BadRequestException } from "../../exceptions/bad-request.exception.js";
import { Lesson } from "../lesson/lesson.model.js";
import { LessonVideo } from "./lesson-video.model.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import ApiFeature from "../../utils/api-feature.utils.js";

class LessonVideoController {
  #_model;
  #_lessonModel;

  constructor() {
    this.#_model = LessonVideo;
    this.#_lessonModel = Lesson;
  }

  createLessonVideo = async (req, res, next) => {
    try {
      const { lessonId, name } = req.body;

      // check lesson ID
      this.#_checkObjectId(lessonId);

      // check lesson
      await this.#_checkLesson(lessonId);

      const video_url = req.file.filename;

      if (!video_url) {
        throw BadRequestException("Lesson video is required");
      }

      await this.#_model.create({
        name,
        lesson: lessonId,
        video_url,
      });

      res.status(201).send({
        message: "Lesson video created successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllLessonVideo = async (req, res, next) => {
    try {
      const query = { ...req.query };

      // GET ALL FILTERED LESSON VIDEOS COUNT
      const allResultsCount = await new ApiFeature(this.#_model.find(), query)
        .filter()
        .sort("createdAt")
        .limitFields()
        .getQuery()
        .countDocuments();

      // EXECUTE QUERY
      const allFilteredLessonVideos = await new ApiFeature(
        this.#_model.find(),
        query
      )
        .filter()
        .sort("createdAt")
        .limitFields()
        .paginate()
        .getQuery()
        .select("-__v");

      res.send({
        message: "success",
        page: req.query?.page || 0,
        limit: req.query?.limit || 10,
        results: allResultsCount,
        data: allFilteredLessonVideos,
      });
    } catch (error) {
      next(error);
    }
  };

  updateLessonVideo = async (req, res, next) => {
    try {
      const { name } = req.body;
      const { lessonVideoId } = req.params;

      // check object ID
      this.#_checkObjectId(lessonVideoId);

      // check video
      await this.#_checkLessonVideo(lessonVideoId);

      await this.#_model.findByIdAndUpdate(lessonVideoId, {
        name,
      });

      res.status(200).send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteLessonVideo = async (req, res, next) => {
    try {
      const { lessonVideoId } = req.params;

      // check object ID
      this.#_checkObjectId(lessonVideoId);

      await this.#_model.findByIdAndDelete(lessonVideoId);

      res.send({
        message: "Success",
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

  #_checkLesson = async (lessonId) => {
    const foundedLesson = await this.#_lessonModel.findById(lessonId);

    if (!foundedLesson) {
      throw new NotFoundException("Lesson not found");
    }
  };

  #_checkLessonVideo = async (lessonVideoId) => {
    const foundedLessonVideo = await this.#_model.findById(lessonVideoId);

    if (!foundedLessonVideo) {
      throw new NotFoundException("Lesson video not found");
    }
  };
}

export default new LessonVideoController();
