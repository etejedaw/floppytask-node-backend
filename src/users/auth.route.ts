import { Router } from "express";
import * as authController from "./auth.controller";
import {
	loginMiddleware,
	jwtMiddleware,
	checkTokenMiddleware
} from "./middlewares";
import { validateBodySchema } from "../commons/middlewares";
import { LoginSchema, RegisterSchema, UpdateUserSchema } from "./schemas";

const router = Router();

router.post(
	"/auth/register",
	validateBodySchema(RegisterSchema),
	authController.createUser
);

router.post(
	"/auth/login",
	[validateBodySchema(LoginSchema), loginMiddleware],
	authController.loginUser
);

router.patch(
	"/auth/user",
	[
		checkTokenMiddleware(),
		validateBodySchema(UpdateUserSchema),
		jwtMiddleware
	],
	authController.updateUser
);

router.delete(
	"/auth/user",
	[checkTokenMiddleware(), jwtMiddleware],
	authController.deactivateUser
);

router.get(
	"/auth/user/me",
	[checkTokenMiddleware(), jwtMiddleware],
	authController.getMeUser
);

export default router;
