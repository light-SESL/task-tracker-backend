class TasksController {
  static async getAllTasks(req, res) {
    return res.status(200).json({
      tasks: [],
    });
  }
}

export default TasksController;
