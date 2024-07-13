import * as bcrypt from "bcrypt";

interface PasswordData {
	password: string;
	hashPassword: string;
	salt: string;
}

export async function hashPassword(password: string, salt: string) {
	return await bcrypt.hash(password, salt);
}

export async function generateSalt() {
	return await bcrypt.genSalt();
}

export async function comparePassword(passwordData: PasswordData) {
	const { password, salt } = passwordData;
	const hash = await hashPassword(password, salt);
	return hash === passwordData.hashPassword;
}
