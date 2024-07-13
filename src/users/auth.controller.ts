import { Request, Response } from "express";
import * as authService from "./auth.service";
import * as userService from "./user.service";
import { LoginSchema, RegisterSchema, UpdateUserSchema } from "./schemas";
import { ZodError } from "zod";
import { IdParamSchema } from "../projects/schemas";
import { NotFoundException } from "../errors";

export async function createUser(request: Request, response: Response) {
	try {
		const register = RegisterSchema.parse(request.body);
		const user = await authService.signUp(register);

		return response.status(200).json({ data: user });
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

		return response.status(200).json({ data: user });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof ZodError)
			return response.status(422).json({ error: error.issues });
		return response.status(400).json({ error });
	}
}

export async function updateUser(request: Request, response: Response) {
	try {
		const idParams = IdParamSchema.parse(request.params);
		const updateUser = UpdateUserSchema.parse(request.body);

		const user = await userService.findUserById(idParams.id);
		if (!user)
			throw new NotFoundException(
				`User with id ${idParams.id} not found`
			);

		const userUpdate = await userService.updateUser(user.email, updateUser);
		if (!user)
			throw new NotFoundException(
				`User with id ${idParams.id} not found`
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
	const idParams = IdParamSchema.parse(request.params);

	const user = await userService.findUserById(idParams.id);
	if (!user)
		throw new NotFoundException(`User with id ${idParams.id} not found`);

	const isDelete = await userService.removeUser(user.email);
	if (!isDelete)
		throw new NotFoundException(`User with id ${idParams.id} not found`);

	return response.status(200).json({ data: "Operation Successful" });
}
