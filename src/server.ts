import express from "express";
import morgan from "morgan";
import { jwtAuthStrategy, localAuthStrategy } from "./users/strategies";
import passport from "passport";
import authRoute from "./users/auth.route";
import projectsRoute from "./projects/projects.route";
import tasksRoute from "./tasks/tasks.route";
import { limiter } from "./config";

export function server(port: number) {
	const VERSION_PREFIX = "/v1";
	try {
		const app = express();

		app.use(morgan("dev"));
		app.use(limiter);
		app.use(express.json());

		app.use(passport.initialize());
		passport.use(localAuthStrategy);
		passport.use(jwtAuthStrategy);

		app.use(VERSION_PREFIX, authRoute);
		app.use(VERSION_PREFIX, projectsRoute);
		app.use(VERSION_PREFIX, tasksRoute);

		app.listen(port);
	} catch (error) {
		console.error(error);
	}
}
