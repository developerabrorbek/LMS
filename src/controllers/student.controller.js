import { readFileCustom } from "../utils/fs.js";
import path from "path";

const filePath = path.join(process.cwd(), "src", "models", "users.json");

// endpoint => /students
export const getAllStudents = (_, res) => {
  const allStudents = readFileCustom(filePath).filter(
    (us) => us.role == "student"
  );

  res.send({
    message: "success",
    data: allStudents
  });
};

// endpoint => /students/:studentId
export const getSingleStudent = (req, res) => {
  const allStudents = readFileCustom(filePath).filter(
    (us) => us.role == "student"
  );

  const studentId = req.params?.studentId;
  if (!studentId) {
    res.status(404).send({
      message: "Student not found",
    });
  }

  const foundedStudent = allStudents.find((s) => s.id == studentId);

  res.send({
    message: "success",
    data: foundedStudent || [],
  });
};
