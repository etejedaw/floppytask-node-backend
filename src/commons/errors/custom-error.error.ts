interface ErrorParameters {
	status: number;
	name: string;
	message: string;
}

export abstract class CustomError extends Error {
	readonly #status: number;
	readonly #name: string;

	constructor(errorParameters: ErrorParameters) {
		super(errorParameters.message);
		this.#status = errorParameters.status;
		this.#name = errorParameters.name;
	}

	get status() {
		return this.#status;
	}

	get name() {
		return this.#name;
	}
}
