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
    groups: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Group",
      },
    ],
  },
  {
    collection: "classes",
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
