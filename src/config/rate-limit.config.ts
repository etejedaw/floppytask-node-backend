import { rateLimit } from "express-rate-limit";

const MINUTES_TO_MS = 60 * 1000;

export const limiter = rateLimit({
	windowMs: 10 * MINUTES_TO_MS,
	limit: 50,
	standardHeaders: "draft-7"
});
