import { Sequelize } from "sequelize";
import { environment } from "./environment.config";

export const sequelize = new Sequelize(
	environment.DB_NAME,
	environment.DB_USERNAME,
	environment.DB_PASSWORD,
	{
		dialect: "mariadb",
		host: environment.DB_HOST,
		port: environment.DB_PORT
	}
);
