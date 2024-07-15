import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Users } from "../users.model";
import { CustomError } from "../../commons/errors";

export function loginMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
) {
	passport.authenticate(
		"local",
		{ session: false },
		async (error: Error, user: Users) => {
			if (user) {
				request.user = user;
				return next();
			}
			if (error instanceof CustomError)
				return response
					.status(error.status)
					.json({ error: error.message });
			return response.status(400).json({ error });
		}
	)(request, response, next);
}
