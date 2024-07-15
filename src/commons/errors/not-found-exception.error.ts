import { CustomError } from "./custom-error.error";

export class NotFoundException extends CustomError {
	constructor(message: string) {
		super({ name: "NotFoundException", status: 404, message });
	}
}
