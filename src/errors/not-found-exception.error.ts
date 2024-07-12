export class NotFoundException extends Error {
	readonly #status: number;

	constructor(message: string) {
		super(message);
		this.name = "NotFoundException";
		this.#status = 404;
	}

	get status() {
		return this.#status;
	}
}
