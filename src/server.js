import path from "path";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes/index.js";
import pageRouter from "./routes/page.routes.js";
import appConfig from "./config/app.config.js";
import mongoDB from "./mongo/mongo.js";
import { ErrorHandlerMiddleware } from "./middleware/error-handler.middleware.js";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

const app = express();

// MORGAN MIDDLEWARE
app.use(morgan("tiny"));

// USE COOKIE PARSER MIDDLEWARE
app.use(cookieParser("secret-key"));

// SET UP METHOD OVERRIDE MIDDLEWARE FOR POST REQUESTS WITH QUERY ?_method=
app.use(methodOverride("_method"));

// SET VIEW ENGINE TO EJS
app.set("view engine", "ejs");

// SET EJS FILES PATH
app.set("views", path.join(process.cwd(), "src", "views"));

// SERVE STATIC FILES IN PUBLIC DIRECTORY -> MIDDLEWARE
app.use("/public", express.static(path.join(process.cwd(), "public"))); // 1

// BODY PARSING MIDDLEWARE
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({ extended: true })); // 3

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

// CATCH ALL UNAVAILABLE ROUTES
app.all("*", (req, res) => {
  res.status(404).send({
    message: `Berilgan ${req.url} endpoint mavjud emas`,
  });
});

// ERROR HANDLER MIDDLEWARE
app.use(ErrorHandlerMiddleware);

// SERVER LISTENING
app.listen(appConfig.port, appConfig.host, () => {
  console.log(`listening on port ${appConfig.port}`);
});
