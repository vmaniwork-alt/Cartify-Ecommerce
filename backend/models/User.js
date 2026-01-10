import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
