import * as userService from "./user.service";
import { CreateUser, Login, Register } from "./schemas";
import { Users } from "./users.model";
import type { PayloadToken } from "./schemas/payload-token.schema";
import { BcryptUtil, JwtUtil } from "./utils";

export async function signUp(register: Register) {
	const { password, ...restRegisterData } = register;

	const salt = await BcryptUtil.generateSalt();
	const hashPassword = await BcryptUtil.hashPassword(password, salt);

	const createUser: CreateUser = {
		...restRegisterData,
		password: hashPassword,
		salt
	};

	return await userService.createUser(createUser);
}

export async function signIn(login: Login) {
	const user = await userService.findUserByEmail(login.email);
	if (!user) return;

	const matchPassword = await BcryptUtil.comparePassword({
		password: login.password,
		hashPassword: user.password,
		salt: user.salt
	});
	if (!matchPassword) return;

	return user;
}

export async function generateJwt(user: Users) {
	const payload: PayloadToken = { sub: user.id };
	const token = JwtUtil.createToken(payload);
	return token;
}
