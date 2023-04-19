import { Router } from "express";
import TasksController from "../../controllers/tasks";
import passport from "passport";
import { celebrate, Joi, Segments } from "celebrate";

const router = Router();

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }, null),
  TasksController.getAllUserTasks
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }, null),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.string().required(),
      dueDate: Joi.string().required(),
    }),
  }),
  TasksController.createTask
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }, null),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      status: Joi.string().optional(),
      dueDate: Joi.string().optional(),
    }),
  }),
  TasksController.updateTasks
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }, null),
  TasksController.deleteTask
);

export default router;
