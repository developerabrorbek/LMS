import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config.js";

export const signToken = (tokenData) =>
  jwt.sign(tokenData, jwtConfig.secretKey, {
    expiresIn: jwtConfig.expireTime,
  });

export const verifyToken = (token) => jwt.verify(token, jwtConfig.secretKey);
