import mongoose from "mongoose";

let userElements = {
  username: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
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
