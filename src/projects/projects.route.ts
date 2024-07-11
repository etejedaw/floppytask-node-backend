import { Router } from "express";
import * as projectsController from "./projects.controller";

const router = Router();

router.get("/projects", projectsController.findAll);
router.get("/projects/:id", projectsController.findOne);
router.post("/projects", projectsController.create);
router.patch("/projects/:id", projectsController.update);
router.delete("/projects/:id", projectsController.remove);

export default router;
