import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { CustomZodError } from "../errors";

export function validateParamsSchema(zodSchema: ZodSchema) {
	return (request: Request, response: Response, next: NextFunction) => {
		try {
			const data = zodSchema.parse(request.params);
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
