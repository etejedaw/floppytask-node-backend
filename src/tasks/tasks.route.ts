import { Router } from "express";
import * as tasksController from "./tasks.controller";

const router = Router();

router.get("/tasks", tasksController.findAll);

export default router;
