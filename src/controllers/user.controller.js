import Joi from "joi";
import User from "../models/user.model.js";

class UserController {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  getAllUsers = async (req, res) => {
    const allUsers = await this.#_userModel.find();

    res.send({
      message: "success",
      data: allUsers,
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
