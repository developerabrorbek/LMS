import mongoose from "mongoose";

const homeworkReplySchema = new mongoose.Schema(
  {
    file_url: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Lesson homework reply description is required"],
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
    homework: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Homework",
    },
  },
  {
    timestamps: true,
    collection: "homework_replies",
  }
);

export const HomeworkReply = mongoose.model(
  "HomeworkReply",
  homeworkReplySchema
);
