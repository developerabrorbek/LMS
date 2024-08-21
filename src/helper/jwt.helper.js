import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config.js";

export const signToken = () =>
  jwt.sign({ name: "Ali" }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expireTime,
  });

export const verifyToken = (token) => jwt.verify(token, jwtConfig.secretKey);
