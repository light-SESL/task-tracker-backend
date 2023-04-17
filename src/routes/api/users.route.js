import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../../controllers/users";
const router = Router();

router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  UsersController.registerUser
);

router.post(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  UsersController.loginUser
);

export default router;
