import { CustomError } from "./custom-error.error";

export class ForbiddenException extends CustomError {
	constructor(message: string) {
		super({ name: "ForbiddenException", status: 403, message });
	}
}
