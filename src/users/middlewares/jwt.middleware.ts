import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { Users } from "../users.model";
import { CustomError, UnauthorizedException } from "../../commons/errors";

export function jwtMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
) {
	passport.authenticate(
		"jwt",
		{ session: false },
		async (error: Error, user: Users) => {
			if (user) {
				request.user = user;
				return next();
			}
			if (!error) {
				const customError = new UnauthorizedException(`Invalid Token`);
				return response
					.status(customError.status)
					.json({ error: customError.message });
			}
			if (error instanceof CustomError)
				return response
					.status(error.status)
					.json({ error: error.message });
			return response.status(400).json({ error });
		}
	)(request, response, next);
}
