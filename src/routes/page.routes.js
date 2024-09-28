import { Router } from "express";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
  res.render("pages/index", { layout: false });
});

pageRouter.get("/forgot-password", (req, res) => {
  res.render("pages/forgot-password", { text: "", layout: false });
});

pageRouter.get("/reset-password/:token", (req, res) => {
  res.render("pages/reset-password", {
    token: req.params.token,
    layout: false,
  });
});

pageRouter.get("/student", (req, res) => {
  res.render("pages/student", { title: "Student panel" });
});

pageRouter.get("/teacher", (req, res) => {
  res.render("pages/teacher", { title: "Teacher panel" });
});

pageRouter.get("/admin/:tabName", (req, res) => {
  let { tabName } = req.params;

  res.render("pages/admin", { title: "Admin page", tab: tabName });
});

pageRouter.get("/super-admin", (req, res) => {
  res.render("pages/super-admin", {
    mainContentLink: `./components/super-admin-${req.query.tab}`,
    title: "Super admin panel",
  });
});

export default pageRouter;
