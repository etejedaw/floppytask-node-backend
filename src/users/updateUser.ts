import { UpdateUser } from "./schemas";
import { Users } from "./users.model";
import { findUserByEmail } from "./user.service";

export async function updateUser(email: string, updateUser: UpdateUser) {
	const user = await findUserByEmail(email);
	if (!user) return;

	if (!updateUser.password)
		await Users.update(updateUser, {
			where: { email }
		});
	else {
		const salt = await bcryptUtil.generateSalt();
		const hashPassword = await bcryptUtil.hashPassword(password, salt);
	}

	return await findUserByEmail(email);
}
