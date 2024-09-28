import path from "path";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import routes from "./routes/index.js";
import pageRouter from "./routes/page.routes.js";
import appConfig from "./config/app.config.js";
import mongoDB from "./mongo/mongo.js";
import { ErrorHandlerMiddleware } from "./middleware/error-handler.middleware.js";
import expressEjsLayouts from "express-ejs-layouts";

const app = express();

// MORGAN MIDDLEWARE
if (process.env.NODE_ENV == "development") {
  app.use(morgan("tiny"));
}

// USE COOKIE PARSER MIDDLEWARE
app.use(cookieParser("secret-key"));

// SET UP METHOD OVERRIDE MIDDLEWARE FOR POST REQUESTS WITH QUERY ?_method=
app.use(methodOverride("_method"));

// SET EJS FILES PATH
app.set("views", path.join(process.cwd(), "src", "views"));

// SET VIEW ENGINE TO EJS
app.set("view engine", "ejs");

// SET DEFAULT LAYOUT FILE
// app.set("layout", "layouts/main");

// SET EJS LAYOUTS
app.use(expressEjsLayouts);

// SERVE STATIC FILES IN PUBLIC DIRECTORY -> MIDDLEWARE
app.use("/public", express.static(path.join(process.cwd(), "public")));

// SERVE STATIC FILES IN UPLOADS DIRECTORY -> MIDDLEWARE
app.use(express.static(path.join(process.cwd(), "uploads")));

// BODY PARSING MIDDLEWARE
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
