import { Router } from "express";
import * as projectsController from "./projects.controller";
import * as tasksController from "../tasks/tasks.controller";
import { checkTokenMiddleware, jwtMiddleware } from "../users/middlewares";
import {
	validateBodySchema,
	validateParamsSchema
} from "../commons/middlewares";
import {
	CreateProjectSchema,
	IdParamsSchema,
	UpdateProjectSchema
} from "./schemas";
import {
	CreateTaskSchema,
	ProjectTaskParamsSchema,
	UpdateTaskSchema
} from "../tasks/schemas";

const router = Router();

router.get(
	"/projects",
	[checkTokenMiddleware(), jwtMiddleware],
	projectsController.findAll
);

router.get(
	"/projects/:projectId",
	[
		validateParamsSchema(IdParamsSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	projectsController.findOne
);

router.post(
	"/projects",
	[
		validateBodySchema(CreateProjectSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	projectsController.create
);

router.patch(
	"/projects/:projectId",
	[
		validateParamsSchema(IdParamsSchema),
		validateBodySchema(UpdateProjectSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	projectsController.update
);

router.delete(
	"/projects/:projectId",
	[
		validateParamsSchema(IdParamsSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	projectsController.remove
);

router.get(
	"/projects/:projectId/tasks",
	[
		validateParamsSchema(IdParamsSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	tasksController.findAllByProject
);

router.get(
	"/projects/:projectId/tasks/:taskId",
	[
		validateParamsSchema(ProjectTaskParamsSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	tasksController.findOne
);

router.post(
	"/projects/:projectId/tasks",
	[
		validateParamsSchema(IdParamsSchema),
		validateBodySchema(CreateTaskSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	tasksController.create
);

router.patch(
	"/projects/:projectId/tasks/:taskId",
	[
		validateParamsSchema(ProjectTaskParamsSchema),
		validateBodySchema(UpdateTaskSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	tasksController.update
);

router.delete(
	"/projects/:projectId/tasks/:taskId",
	[
		validateParamsSchema(ProjectTaskParamsSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	tasksController.remove
);

export default router;
