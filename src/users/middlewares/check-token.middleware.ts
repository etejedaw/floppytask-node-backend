import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CustomZodError } from "../../commons/errors";
import { AuthorizationTokenSchema } from "../schemas";

export function checkTokenMiddleware() {
	return (request: Request, response: Response, next: NextFunction) => {
		try {
			const data = AuthorizationTokenSchema.parse(request.headers);
			request.headers = data;
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
