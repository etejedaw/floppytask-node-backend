import { Request, Response } from "express";
import * as authService from "./auth.service";
import * as userService from "./user.service";
import {
	IdParamsSchema,
	LoginSchema,
	RegisterSchema,
	UpdateUserSchema
} from "./schemas";
import { ZodError } from "zod";
import { NotFoundException } from "../errors";

export async function createUser(request: Request, response: Response) {
	try {
		const register = RegisterSchema.parse(request.body);

		const user = await authService.signUp(register);
		const token = await authService.generateJwt(user);

		return response.status(200).json({ data: { user, token } });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		return response.status(400).json({ error });
	}
}

export async function loginUser(request: Request, response: Response) {
	try {
		const loginUser = LoginSchema.parse(request.body);

		const user = await authService.signIn(loginUser);
		if (!user) throw new Error("Error Login");

		const token = await authService.generateJwt(user);

		return response.status(200).json({ data: { user, token } });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		return response.status(400).json({ error });
	}
}

export async function updateUser(request: Request, response: Response) {
	try {
		const idParams = IdParamsSchema.parse(request.params);
		const updateUser = UpdateUserSchema.parse(request.body);

		const user = await userService.findUserById(idParams.userId);
		if (!user)
			throw new NotFoundException(
				`User with id ${idParams.userId} not found`
			);

		const userUpdate = await userService.updateUser(user.email, updateUser);
		if (!user)
			throw new NotFoundException(
				`User with id ${idParams.userId} not found`
			);

		return response.status(200).json({ data: userUpdate });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		return response.status(400).json({ error });
	}
}

export async function deactivateUser(request: Request, response: Response) {
	try {
		const idParams = IdParamsSchema.parse(request.params);

		const user = await userService.findUserById(idParams.userId);
		if (!user)
			throw new NotFoundException(
				`User with id ${idParams.userId} not found`
			);

		const isDelete = await userService.removeUser(user.email);
		if (!isDelete)
			throw new NotFoundException(
				`User with id ${idParams.userId} not found`
			);

		return response.status(200).json({ data: "Operation Successful" });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		return response.status(400).json({ error });
	}
}

export async function getUser(request: Request, response: Response) {
	try {
		const idParams = IdParamsSchema.parse(request.params);

		const user = await userService.findUserById(idParams.userId);
		if (!user)
			throw new NotFoundException(
				`User with id ${idParams.userId} not found`
			);

		return response.status(200).json({ data: user });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		return response.status(400).json({ error });
	}
}
