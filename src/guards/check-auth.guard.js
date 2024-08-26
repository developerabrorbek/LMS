import jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { verifyToken } from "../helper/jwt.helper.js";

export const CheckAuthGuard = (isProtected) => {
  return (req, _, next) => {
    if (!isProtected) {
      next();
    }

    const token = req.headers["authorization"];

    console.log(token)

    if (!(token && token.startsWith("Bearer") && token.split(" ")[1])) {
      throw new BadRequestException(`Given token: ${token} is invalid`);
    }

    const accessToken = token.split(" ")[1];

    // Verify access token
    verifyToken(accessToken);

    const { id, role } = jwt.decode(accessToken);

    // SET ID AND ROLE TO REQUEST OBJECT
    req.userId = id;
    req.role = role;

    next();
  };
};
