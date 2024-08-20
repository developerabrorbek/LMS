import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name berilishi shart⚠️"],
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: false,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "username berilishi shart!"],
    },
    password: {
      type: String,
      unique: true,
      required: [true, "password berilishi shart!"],
    },
    phone: {
      type: String,
      required: true,
      minLength: [12, "Nomer 12 uzunlikda bo'lishi kerak"],
      maxLength: 12,
    },
    role: {
      type: String,
      enum: {
        values: ["student", "teacher", "admin", "super_admin"],
      },
      required: true,
      default: "student",
    },
    birthDate: {
      type: Date,
      required: true,
    },
    image_url: {
      type: String,
      required: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
