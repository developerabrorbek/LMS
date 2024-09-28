import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.config.js";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { TokenExpiredException } from "../exceptions/token-expired.exception.js";

export const signToken = (
  tokenData,
  secretKey = jwtConfig.secretKey,
  expireTime = jwtConfig.expireTime
) =>
  jwt.sign(tokenData, secretKey, {
    expiresIn: expireTime,
  });

export const verifyToken = (token, secretKey = jwtConfig.secretKey) =>
  jwt.verify(token, secretKey, (err, _) => {
    if (err && err instanceof jwt.NotBeforeError) {
      throw new BadRequestException("Not before JWT error");
    }

    if (err && err instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredException("Token already expired");
    }

    if (err && err instanceof jwt.JsonWebTokenError) {
      throw new BadRequestException("Invalid JWT token");
    }
  });
