import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    //   required: [true, "Username is required"],
    },
    email: {
      type: String,
    //   required: [true, "Email is required"],
    //   unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
