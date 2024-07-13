import * as userService from "./user.service";
import * as bcryptUtil from "./bcrypt.util";
import { CreateUser, Login, Register } from "./schemas";

export async function signUp(register: Register) {
	const { password, ...restRegisterData } = register;

	const salt = await bcryptUtil.generateSalt();
	const hashPassword = await bcryptUtil.hashPassword(password, salt);

	const user: CreateUser = {
		...restRegisterData,
		password: hashPassword,
		salt
	};

	return await userService.createUser(user);
}

export async function signIn(login: Login) {
	const user = await userService.findUserByEmail(login.email);
	if (!user) return;

	const matchPassword = await bcryptUtil.comparePassword({
		password: login.password,
		hashPassword: user.password,
		salt: user.salt
	});

	if (!matchPassword) return;

	return user;
}
