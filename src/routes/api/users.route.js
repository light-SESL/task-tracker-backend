import { Router } from 'express';
import UsersController from "../../controllers/users";
const router = Router();

router.get('/create', UsersController.registerUser);

export default router;
