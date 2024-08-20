import { config } from "dotenv";

config();

const mongoConfig = {
  url: process.env.MONGO_URL + process.env.MONGO_DATABASE,
};

export default mongoConfig;
