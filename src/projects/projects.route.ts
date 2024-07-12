import { Router } from "express";
import * as projectsController from "./projects.controller";
import * as tasksController from "../tasks/tasks.controller";

const router = Router();

router.get("/projects", projectsController.findAll);
router.get("/projects/:id", projectsController.findOne);
router.post("/projects", projectsController.create);
router.patch("/projects/:id", projectsController.update);
router.delete("/projects/:id", projectsController.remove);
router.get("/projects/:projectId/tasks", tasksController.findAllByProject);
router.get("/projects/:projectId/tasks/:taskId", tasksController.findOne);
router.post("/projects/:projectId/tasks", tasksController.create);
router.patch("/projects/:projectId/tasks/:taskId", tasksController.update);
router.delete("/projects/:projectId/tasks/:taskId", tasksController.remove);

export default router;
