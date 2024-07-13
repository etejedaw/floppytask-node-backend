import { Router } from "express";
import * as authController from "./auth.controller";

const router = Router();

router.post("/auth/register", authController.createUser);
router.post("/auth/login", authController.loginUser);
router.patch("/auth/:id", authController.updateUser);
router.delete("/auth/:id", authController.deactivateUser);

export default router;
