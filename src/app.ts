import express from "express";
import { environment, sequelize } from "./config";
import projectsRoute from "./projects/projects.route";
import tasksRoute from "./tasks/tasks.route";

import "./tasks/tasks.model";
import "./projects/projects.model";

async function init() {
	try {
		await sequelize.sync();
		console.log(`DATABASE | Connection stablished`);

		const app = express();

		app.use(express.json());
		app.use("/v1", projectsRoute);
		app.use("/v1", tasksRoute);
		app.listen(environment.PORT);

		console.log(`MAIN | Connected on port ${environment.PORT}`);
	} catch (error: any) {
		console.error(error);
	}
}

void init();
