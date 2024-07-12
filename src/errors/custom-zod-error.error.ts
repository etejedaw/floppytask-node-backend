import { ZodError, ZodIssue } from "zod";

export class CustomZodError extends ZodError {
	readonly #status: number;

	constructor(issues: ZodIssue[]) {
		super(issues);
		this.name = "CustomZodError";
		this.#status = 422;
	}

	get status() {
		return this.#status;
	}
}
