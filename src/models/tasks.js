import mongoose from "mongoose";

let taskElements = {
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: false,
  },
};
const TaskSchema = new mongoose.Schema({
  ...taskElements,
});
let Tasks = mongoose.model("tasks", TaskSchema);
export default Tasks;
