import * as bcrypt from "bcrypt";

interface PasswordData {
	password: string;
	hashPassword: string;
	salt: string;
}

export class BcryptUtil {
	static async hashPassword(password: string, salt: string) {
		return await bcrypt.hash(password, salt);
	}

	static async generateSalt() {
		return await bcrypt.genSalt();
	}

	static async comparePassword(passwordData: PasswordData) {
		const { password, salt } = passwordData;
		const hash = await this.hashPassword(password, salt);
		return hash === passwordData.hashPassword;
	}
}
