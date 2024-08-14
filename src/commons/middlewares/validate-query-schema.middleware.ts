import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { CustomZodError } from "../errors";

export function validateQuerySchema(zodSchema: ZodSchema) {
	return (request: Request, response: Response, next: NextFunction) => {
		try {
			const data = zodSchema.parse(request.query);
			request.query = data;
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
