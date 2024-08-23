import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";
import { signToken } from "../helper/jwt.helper.js";

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

      const accessToken = signToken({
        id: foundedUser.id,
        role: foundedUser.role,
      });

      res.send({
        message: "success",
        token: accessToken,
      });

      // switch (foundedUser.role) {
      //   case "student":
      //     res.redirect("/student");
      //     break;
      //   case "teacher":
      //     res.redirect("/teacher");
      //     break;
      //   case "admin":
      //     res.redirect("/admin");
      //     break;
      //   case "super-admin":
      //     res.redirect("/super-admin");
      //     break;
      //   default:
      //     res.render("404", { message: "User page not found" });
      // }
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
