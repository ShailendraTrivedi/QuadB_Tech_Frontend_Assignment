import Task from "./models.js";

async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.task = task;
  next();
}

export default getTask