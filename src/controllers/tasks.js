import { decodeToken } from "../utils/decodeToken";
import Tasks from "../models/tasks";

class TasksController {
  static async getAllUserTasks(req, res) {
    const { username } = await decodeToken(req);
    const userTasks = await Tasks.find({ username }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      tasks: userTasks,
    });
  }

  static async createTask(req, res) {
    const { username } = await decodeToken(req);
    const { title, description, status, priority, dueDate } = req.body;

    const createdTask = await Tasks.create({
      title,
      description,
      status,
      priority,
      dueDate,
      username,
    });

    return res.status(201).json({
      message: "task created",
      createdTask,
    });
  }

  static async updateTasks(req, res) {
    await decodeToken(req);
    const { id } = req.params;

    await Tasks.findOneAndUpdate(
      {
        _id: id,
      },
      req.body
    );

    //TODO return updated data
    return res.status(201).json({
      // updatedTask,
      message: "taskUpdated",
    });
  }

  static async deleteTask(req, res) {
    await decodeToken(req);

    const { id } = req.params;
    const task = await Tasks.findOne({
      _id: id,
    });
    if (!task) {
      return res.status(200).json({
        error: "task doesn't exist",
      });
    }

    await task.remove();

    return res.status(204).json({
      message: "task created",
    });
  }
}

export default TasksController;
