import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { CustomZodError } from "../../commons/errors";
import { AuthorizationTokenSchema } from "../schemas";

export function checkToken() {
	return (request: Request, response: Response, next: NextFunction) => {
		try {
			const data = AuthorizationTokenSchema.parse(request.headers);
			request.params = data;
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const zodError = new CustomZodError(error.message);
				return response
					.status(zodError.status)
					.json({ error: JSON.parse(zodError.message) });
			}
			console.error({ error });
			return response.status(400).json({ error });
		}
	};
}
