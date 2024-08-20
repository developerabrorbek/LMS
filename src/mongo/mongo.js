import mongoose from "mongoose";
import mongoConfig from "../config/mongo.config.js";

async function mongoDB() {
  await mongoose.connect(mongoConfig.url);
}

export default mongoDB;
