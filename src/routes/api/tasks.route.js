import { Router } from 'express';
import TasksController from "../../controllers/tasks";
const router = Router();

router.get('/', TasksController.getAllTasks);

export default router;
