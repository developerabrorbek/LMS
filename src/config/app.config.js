import { config } from "dotenv";

config();

const appConfig = {
  port: parseInt(process.env.APP_PORT) || 3000,
  host: process.env.APP_HOST,
};

export default appConfig;
