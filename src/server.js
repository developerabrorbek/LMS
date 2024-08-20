import path from "path";
import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import pageRouter from "./routes/page.routes.js";
import appConfig from "./config/app.config.js";
import mongoDB from "./mongo/mongo.js";

const app = express();

// SET VIEW ENGINE TO EJS
app.set("view engine", "ejs");

// SET EJS FILES PATH
app.set("views", path.join(process.cwd(), "src", "views"));

// SERVE STATIC FILES IN PUBLIC DIRECTORY
app.use("/public", express.static(path.join(process.cwd(), "public")));

// BODY PARSING
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  CONNECTING TO MONGODB DATABASE
mongoDB()
  .then(() => {
    console.log("MongoDB ga ulandi");
  })
  .catch((err) => {
    console.log(err.message);
  });

// PAGE ROUTES
app.use("/", pageRouter);

// API ROUTES
app.use("/api/v1", routes);

// SERVER LISTENING
app.listen(appConfig.port, appConfig.host, () => {
  console.log(`listening on port ${appConfig.port}`);
});
