import { environment, sequelize } from "./config";
import "./tasks/tasks.model";
import "./projects/projects.model";
import "./users/users.model";
import { server } from "./server";

async function init() {
	try {
		const port = environment.PORT;

		await sequelize.sync();
		console.log(`${new Date()} | MAIN | Database Connection Established`);

		server(port);
		console.log(`${new Date()} | MAIN | Server Connected on port ${port}`);
	} catch (error) {
		console.error(error);
	}
}

void init();
