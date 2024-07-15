import { Router } from "express";
import * as tasksController from "./tasks.controller";
import { checkTokenMiddleware, jwtMiddleware } from "../users/middlewares";

const router = Router();

router.get(
	"/tasks",
	[checkTokenMiddleware(), jwtMiddleware],
	tasksController.findAll
);

export default router;
