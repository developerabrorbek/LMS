import { config } from "dotenv";

config();

const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY,
  expireTime: process.env.JWT_EXPIRE_TIME,
  refreshKey: process.env.REFRESH_TOKEN_SECRET_KEY,
  refreshExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME,
};

export default jwtConfig;
