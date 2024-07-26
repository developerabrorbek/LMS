import express from "express";
import { APP_PORT } from "./constants/app.constants.js";

const app = express()

app.listen(APP_PORT, () => {
  console.log(`listening on port ${APP_PORT}`);
})