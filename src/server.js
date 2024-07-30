import express from "express";
import { APP_PORT } from "./constants/app.constants.js";
import bodyParser from "body-parser";
import path from "path";
import studentRoutes from "./routes/student.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/student", (req, res) => {
  res.render("student");
});

app.get("/teacher", (req, res) => {
  res.render("teacher");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/super-admin", (req, res) => {
  res.render("super-admin", {
    mainContentLink: `./components/super-admin-${req.query.tab}`,
  });
});

app.use("/students", studentRoutes);
app.use("/auth", authRoutes);

app.listen(APP_PORT, () => {
  console.log(`listening on port ${APP_PORT}`);
});
