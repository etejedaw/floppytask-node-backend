import { Router } from "express";
import * as tasksController from "./tasks.controller";
import { checkTokenMiddleware, jwtMiddleware } from "../users/middlewares";
import {
	validateBodySchema,
	validateParamsSchema
} from "../commons/middlewares";
import { ProjectTaskParamsSchema, UpdateTaskSchema } from "./schemas";
import { TaskIdParamsSchema } from "./schemas/task-id-params.schema";

const router = Router();

router.get(
	"/tasks",
	[checkTokenMiddleware(), jwtMiddleware],
	tasksController.findAllByUser
);

router.get(
	"/tasks/:taskId",
	[
		validateParamsSchema(TaskIdParamsSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	tasksController.findOne
);

router.patch(
	"/tasks/:taskId",
	[
		validateParamsSchema(TaskIdParamsSchema),
		validateBodySchema(UpdateTaskSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	tasksController.update
);

router.delete(
	"/tasks/:taskId",
	[
		validateParamsSchema(TaskIdParamsSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	tasksController.remove
);

export default router;
