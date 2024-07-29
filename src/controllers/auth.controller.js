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
      res.render("student", { student: foundedUser });
      break;
    case "teacher":
      res.render("teacher", { teacher: foundedUser });
      break;
    case "admin":
      res.render("admin", { admin: foundedUser });
      break;
    default:
      res.render("404", { message: "User role not found" });
  }
};
