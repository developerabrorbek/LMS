import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lesson name is required"],
    },
    group: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Group",
    },
  },
  {
    timestamps: true,
    collection: "lessons",
  }
);

export const Lesson = mongoose.model("Lesson", lessonSchema);
