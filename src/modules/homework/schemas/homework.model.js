import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema(
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
    homeworkReplies: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "HomeworReplies",
      },
    ],
  },
  {
    timestamps: true,
    collection: "homeworks",
  }
);

export const Homework = mongoose.model("Homework", homeworkSchema);
