import path from "path";
import { readFileCustom } from "../utils/fs.js";

const filePath = path.join(process.cwd(), "src", "models", "users.json");

export const login = (req, res) => {
  const { username, password } = req.body;

  const allUsers = readFileCustom(filePath);

  const foundedUser = allUsers.find(
    (us) => us.username == username && us.password == password
  );

  if (!foundedUser) {
    res.render("404", { message: "User not found" });
    return ;
  }

  switch (foundedUser.role) {
    case "student":
      res.redirect(`/student?id=${foundedUser.id}`);
      break;
    case "teacher":
      res.redirect(`/teacher?id=${foundedUser.id}`);
      break;
    case "admin":
      res.redirect(`/admin?id=${foundedUser.id}`);
      break;
    case "super_admin":
      res.redirect(`/super-admin`);
      break;
    default:
      res.redirect("404", { message: "User role not found" });
  }
};
