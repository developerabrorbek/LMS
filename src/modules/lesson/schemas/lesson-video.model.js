import mongoose from "mongoose";

const lessonVideoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lesson video name is required"],
    },
    video_url: {
      type: String,
      required: [true, "Video URL is required"]
    },
    lesson: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Lesson",
    },
  },
  {
    timestamps: true,
    collection: "lesson_video",
  }
);

export const LessonVideo = mongoose.model("LessonVideo", lessonVideoSchema);
