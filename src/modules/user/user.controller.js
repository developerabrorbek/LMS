import { isValidObjectId } from "mongoose";
import bcrypt from "bcrypt";
import User from "./user.model.js";
import ApiFeature from "../../utils/api-feature.utils.js";
import { BadRequestException } from "../../exceptions/bad-request.exception.js";
import bcryptConfig from "../../config/bcrypt.config.js";

class UserController {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  getAllUsers = async (req, res, next) => {
    try {
      const query = { ...req.query };

      // GET ALL FILTERED PRODUCTS COUNT
      const allResultsCount = await new ApiFeature(
        this.#_userModel.find(),
        query
      )
        .filter()
        .sort("birthDate")
        .limitFields()
        .getQuery()
        .countDocuments();

      // EXECUTE QUERY
      const allFilteredUsers = await new ApiFeature(
        this.#_userModel.find(),
        query
      )
        .filter()
        .sort("birthDate")
        .limitFields()
        .paginate()
        .getQuery()
        .populate("groups")
        .select("-password");

      res.send({
        message: "success",
        page: req.query?.page || 0,
        limit: req.query?.limit || 10,
        results: allResultsCount,
        data: allFilteredUsers,
      });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const hashedPass = await bcrypt.hash(req.body.password, bcryptConfig.rounds);

      await this.#_userModel.create({
        ...req.body,
        password: hashedPass,
      });

      res.status(201).send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    try {
      const { first_name, last_name, username, password, phone, birthDate } =
        req.body;

      let newPasswordHash = undefined;

      if (password) {
        newPasswordHash = await bcrypt.hash(req.body.password, 12);
      }

      const { userId } = req.params;

      // check userid
      this.#_checkObjectId(userId);

      await this.#_userModel.findByIdAndUpdate(userId, {
        first_name,
        last_name,
        password: newPasswordHash,
        username,
        phone,
        birthDate,
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.params;

      // check userid
      this.#_checkObjectId(userId);

      await this.#_userModel.findByIdAndDelete(userId);

      res.send({
        message: "successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  };

  #_checkObjectId = (id) => {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Given ${id} is not a valid ObjectID`);
    }
  };
}

export default new UserController();
