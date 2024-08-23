import mongoose, { mongo, SchemaTypes } from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Yo'nalish nomi berilishi shart⚠️"],
      trim: true,
      unique: true,
    },
    childFields: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Field",
      },
    ],
    parentField: {
      type: SchemaTypes.ObjectId,
      ref: "Field",
    },
    groups: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Group",
      },
    ],
  },
  {
    collection: "fields",
    timestamps: true,
  }
);

const Field = mongoose.model("Field", fieldSchema);

export default Field;
