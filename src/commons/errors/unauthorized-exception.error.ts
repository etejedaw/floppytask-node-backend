import { CustomError } from "./custom-error.error";

export class UnauthorizedException extends CustomError {
	constructor(message: string) {
		super({ name: "UnauthorizedException", status: 401, message });
	}
}
