import { CreateUser, UpdateUser } from "./schemas";
import { Users } from "./users.model";
import * as bcryptUtil from "./bcrypt.util";

export async function createUser(CreateUserHash: CreateUser) {
	const user = await Users.create(CreateUserHash);
	return user;
}

export async function findUserByEmail(email: string) {
	const user = await Users.findOne({
		where: { email, isActive: true }
	});
	if (!user) return;

	return user;
}

export async function findUserById(id: string) {
	const user = await Users.findOne({
		where: { id, isActive: true }
	});
	if (!user) return;

	return user;
}

export async function updateUser(email: string, updateUser: UpdateUser) {
	const user = await findUserByEmail(email);
	if (!user) return;

	const { password, ...restUpdateUser } = updateUser;

	if (!password)
		await Users.update(updateUser, {
			where: { email }
		});
	else {
		const salt = await bcryptUtil.generateSalt();
		const hashPassword = await bcryptUtil.hashPassword(password, salt);
		const passwordData = { password: hashPassword, salt };
		await Users.update(
			{ ...passwordData, ...restUpdateUser },
			{ where: { email } }
		);
	}

	return await findUserByEmail(email);
}

export async function removeUser(email: string) {
	const user = await findUserByEmail(email);
	if (!user) return false;

	await Users.update({ isActive: false }, { where: { email } });
	return true;
}
