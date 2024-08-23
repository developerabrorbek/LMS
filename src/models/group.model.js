import mongoose, { SchemaTypes } from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Guruh nomi berilishi shart⚠️"],
      trim: true,
      unique: true,
    },
    students: [
      {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    field: {
      type: SchemaTypes.ObjectId,
      ref: "Field",
    },
    class: {
      type: SchemaTypes.ObjectId,
      ref: "Class",
    },
  },
  {
    collection: "groups",
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
