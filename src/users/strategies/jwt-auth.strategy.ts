import type {
	StrategyOptionsWithoutRequest,
	VerifyCallback
} from "passport-jwt";
import type { PayloadToken } from "../schemas/payload-token.schema";
import { ExtractJwt, Strategy } from "passport-jwt";
import { environment } from "../../config";
import * as userService from "../user.service";
import { UnauthorizedException } from "../../commons/errors";

const options: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: environment.JWT_SECRET
};

const validate: VerifyCallback = async (payload: PayloadToken, done) => {
	try {
		const user = await userService.findUserById(payload.sub);
		if (!user) return done(new UnauthorizedException("Invalid Token"));
		return done(null, user);
	} catch (error) {
		return done(error);
	}
};

export const jwtAuthStrategy = new Strategy(options, validate);
