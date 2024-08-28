import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { signToken } from "../../helper/jwt.helper.js";
import { sendMail } from "../../utils/send-email.utils.js";
import passwordResetConfig from "../../config/password-reset.config.js";
import crypto from "crypto";
import bcryptConfig from "../../config/bcrypt.config.js";
import appConfig from "../../config/app.config.js";
import { ConflictException } from "../../exceptions/conflic.exception.js";

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

      await sendMail({
        to: "sardor.tolibov04@gmail.com",
        subject: "DEMO EMAIL FROM LMS",
        html: "<h1 style='color:red;'>Assalomu alaykum</h1>",
      });

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

      res.cookie("token", accessToken, { maxAge: 1000 * 60 * 6, signed: true });

      res.send({
        message: "success",
        // token: accessToken,
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

  // Reset Password
  resetPassword = async (req, res, next) => {
    try {
      const { password } = req.body;

      const token = req.params.token;

      const foundedUser = await this.#_userModel.findOne({
        passwordResetToken: token,
      });

      if (!foundedUser) {
        throw new NotFoundException("User not found");
      }

      if (foundedUser.passwordResetTokenExpireTime - Date.now() < 0) {
        throw new ConflictException("Password reset time already expired");
      }

      const hashedPass = await bcrypt.hash(password, bcryptConfig.rounds);

      await this.#_userModel.findByIdAndUpdate(foundedUser.id, {
        password: hashedPass,
        passwordResetToken: null,
        passwordResetTokenExpireTime: null,
      });

      res.redirect("/");
    } catch (error) {
      next(error);
    }
  };

  // Forgot Password
  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;

      const foundedUser = await this.#_userModel.findOne({ email });

      if (!foundedUser) {
        throw new NotFoundException("User not found");
      }

      const randomText = crypto.randomBytes(32).toString("hex");

      const passwordResetUrl = `${req.protocol}://${req.host}:${appConfig.port}/reset-password/${randomText}`;

      await sendMail({
        html: `<a href="${passwordResetUrl}">Click here</a>`,
        to: foundedUser.email,
        subject: "Click link below to reset password",
      });

      await this.#_userModel.findByIdAndUpdate(foundedUser.id, {
        passwordResetToken: randomText,
        passwordResetTokenExpireTime:
          Date.now() + Number(passwordResetConfig.expireTime) * 1000,
      });

      res.render("forgot-password", {
        text: "Send reset password link to your email! Check out❗",
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
