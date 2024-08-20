import { Router } from "express";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
  res.render("index");
});

pageRouter.get("/student", (req, res) => {
  res.render("student");
});

pageRouter.get("/teacher", (req, res) => {
  res.render("teacher");
});

pageRouter.get("/admin", (req, res) => {
  res.render("admin");
});

pageRouter.get("/super-admin", (req, res) => {
  res.render("super-admin", {
    mainContentLink: `./components/super-admin-${req.query.tab}`,
  });
});

export default pageRouter;
