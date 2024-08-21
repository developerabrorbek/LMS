import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";

class AuthController {
  #_userModel;

  constructor() {
    this.#_userModel = User;
  }

  // LOGIN
  signin = async (req, res, next) => {
    try {
      const foundedUser = await this.#_userModel.findOne({
        username: req.body.username,
      });

      if (!foundedUser) {
        throw new NotFoundException("User not found");
      }

      const result = await bcrypt.compare(
        req.body.password,
        foundedUser.password
      );

      if (!result) {
        return res.status(409).send({
          message: "Invalid password or username",
        });
      }

      res.status(200).send({
        message: "success",
        data: foundedUser,
      });
    } catch (error) {
      next(error);
    }
  };

  // REGISTER
  signup = async (req, res) => {
    res.send("ok");
  };
}

export default new AuthController();
