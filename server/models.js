import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  category: { type: String, required: true },
});

const Task = mongoose.model("tasks", taskSchema);
export default Task;
