import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Xonaning nomi berilishi shart⚠️"],
      trim: true,
      unique: true,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    collection: "classes",
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
