import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name field required"],
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: [true, "Phone number field required"],
  },
  codeOTP: {
    type: String,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel };
