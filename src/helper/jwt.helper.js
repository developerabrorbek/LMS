import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config.js";

export const signToken = () =>
  jwt.sign({ name: "Ali" }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expireTime,
  });
