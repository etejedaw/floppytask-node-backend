import { environment } from "../../config";
import type { PayloadToken } from "../schemas/payload-token.schema";
import jwt from "jsonwebtoken";

export class JwtUtil {
	static async createToken(payload: PayloadToken) {
		return jwt.sign(payload, environment.JWT_SECRET, {
			expiresIn: environment.JWT_EXPIRES
		});
	}
}
