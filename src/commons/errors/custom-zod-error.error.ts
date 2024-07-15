import { CustomError } from "./custom-error.error";

export class CustomZodError extends CustomError {
	constructor(message: string) {
		super({ name: "CustomZodError", status: 422, message });
	}
}
