import Joi from "joi";
import User from "../models/user.model.js";
import ApiFeature from "../utils/api-feature.utils.js";

class UserController {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  getAllUsers = async (req, res) => {
    const query = { ...req.query };

    // GET ALL FILTERED PRODUCTS COUNT
    const allResultsCount = await new ApiFeature(this.#_userModel.find(), query)
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
      .getQuery();

    res.send({
      message: "success",
      page: req.query?.page || 0,
      limit: req.query?.limit || 10,
      results: allResultsCount,
      data: allFilteredUsers,
    });
  };

  createUser = async (req, res) => {
    await this.#_userModel.create(req.body);

    res.status(201).send({
      message: "success",
    });
  };
}

export default new UserController();