import type { IStrategyOptions, VerifyFunction } from "passport-local";
import { Strategy } from "passport-local";
import { Login } from "../schemas";
import * as authService from "../auth.service";
import { UnauthorizedException } from "../../commons/errors";

const options: IStrategyOptions = {
	usernameField: "email",
	passwordField: "password"
};

const validate: VerifyFunction = async (email, password, done) => {
	try {
		const login: Login = { email, password };
		const user = await authService.signIn(login);
		if (!user)
			return done(new UnauthorizedException("Invalid Credentials"));
		return done(null, user);
	} catch (error) {
		return done(error);
	}
};

export const localAuthStrategy = new Strategy(options, validate);
