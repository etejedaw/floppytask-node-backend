import { Request, Response } from "express";
import * as authService from "./auth.service";
import * as userService from "./users.service";
import type { Register, UpdateUser } from "./schemas";
import { CustomError, NotFoundException } from "../commons/errors";
import { Users } from "./users.model";

export async function createUser(request: Request, response: Response) {
	try {
		const register = request.body as Register;

		const user = await authService.signUp(register);
		const token = await authService.generateJwt(user);

		return response.status(200).json({ data: { user, token } });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof CustomError)
			return response.status(error.status).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function loginUser(request: Request, response: Response) {
	try {
		const user = request.user as Users;

		const token = await authService.generateJwt(user);

		return response.status(200).json({ data: { token } });
	} catch (error) {
		console.error({ error });
		return response.status(400).json({ error });
	}
}

export async function updateUser(request: Request, response: Response) {
	try {
		const userBody = request.user as Users;
		const updateUser = request.body as UpdateUser;

		const userEmail = userBody.email;
		const userId = userBody.id;

		const user = await userService.updateUser(userEmail, updateUser)!;
		if (!user)
			throw new NotFoundException(`User with id ${userId} not found`);

		return response.status(200).json({ data: user });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof CustomError)
			return response.status(422).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function deactivateUser(request: Request, response: Response) {
	try {
		const userBody = request.user as Users;
		const userId = userBody.id;

		const user = await userService.findUserById(userId);

		if (!user)
			throw new NotFoundException(`User with id ${userId} not found`);

		await userService.removeUser(user.email);

		return response.status(200).json({ data: "Operation Successful" });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof CustomError)
			return response.status(422).json({ error: error.message });
		return response.status(400).json({ error });
	}
}

export async function getMeUser(request: Request, response: Response) {
	try {
		const userBody = request.user as Users;
		const userId = userBody.id;

		const user = await userService.findUserById(userId);
		if (!user)
			throw new NotFoundException(`User with id ${userId} not found`);

		return response.status(200).json({ data: user });
	} catch (error) {
		console.error({ error, body: request.body });
		if (error instanceof CustomError)
			return response.status(422).json({ error: error.message });
		return response.status(400).json({ error });
	}
}
