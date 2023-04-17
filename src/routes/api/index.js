import { Router } from "express";
import userRoute from "./users.route";
import taskRoute from "./tasks.route";

const routes = Router();

routes.use("/users", userRoute);
routes.use("/tasks", taskRoute);

export default routes;
