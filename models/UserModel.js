import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    results: {
      type: Object,
      default: {
        ImplementationSpecialists: 0,
        RealWorlders: 0,
        DisruptiveInnovator: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
