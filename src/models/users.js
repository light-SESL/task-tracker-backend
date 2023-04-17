import mongoose from "mongoose";

let userElements = {
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: false,
  },
};
const UserSchema = new mongoose.Schema({
  ...userElements,
});
let User = mongoose.model("user", UserSchema);
export default User;
