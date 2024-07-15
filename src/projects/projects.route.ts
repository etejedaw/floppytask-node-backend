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

const router = Router();

router.get(
	"/projects",
	[checkTokenMiddleware(), jwtMiddleware],
	projectsController.findAll
);

router.get(
	"/projects/:id",
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
	"/projects/:id",
	[
		validateParamsSchema(IdParamsSchema),
		validateBodySchema(UpdateProjectSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	projectsController.update
);

router.delete(
	"/projects/:id",
	[
		validateParamsSchema(IdParamsSchema),
		checkTokenMiddleware(),
		jwtMiddleware
	],
	projectsController.remove
);

router.get(
	"/projects/:projectId/tasks",
	[checkTokenMiddleware(), jwtMiddleware],
	tasksController.findAllByProject
);

router.get(
	"/projects/:projectId/tasks/:taskId",
	[checkTokenMiddleware(), jwtMiddleware],
	tasksController.findOne
);

router.post(
	"/projects/:projectId/tasks",
	[checkTokenMiddleware(), jwtMiddleware],
	tasksController.create
);

router.patch(
	"/projects/:projectId/tasks/:taskId",
	[checkTokenMiddleware(), jwtMiddleware],
	tasksController.update
);

router.delete(
	"/projects/:projectId/tasks/:taskId",
	[checkTokenMiddleware(), jwtMiddleware],
	tasksController.remove
);

export default router;
