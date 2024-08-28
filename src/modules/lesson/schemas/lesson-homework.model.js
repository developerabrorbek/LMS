import mongoose from "mongoose";

const lessonHomeworkSchema = new mongoose.Schema(
  {
    file_url: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Lesson homework description is required"],
    },
    expireAt: {
      type: Date,
      required: [true, "Expire time is required"],
    },
    lesson: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Lesson",
    },
  },
  {
    timestamps: true,
    collection: "lesson_homework",
  }
);

export const LessonHomework = mongoose.model("LessonHomework", lessonHomeworkSchema);
