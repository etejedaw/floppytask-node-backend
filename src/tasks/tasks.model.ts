import { DataTypes } from "sequelize";
import { sequelize } from "../config";

export const Tasks = sequelize.define("tasks", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.STRING
	},
	notes: {
		type: DataTypes.STRING
	},
	estimatedTime: {
		type: DataTypes.NUMBER
	},
	deadLine: {
		type: DataTypes.DATE
	},
	startDate: {
		type: DataTypes.DATE
	},
	endDate: {
		type: DataTypes.DATE
	},
	isDone: {
		type: DataTypes.BOOLEAN
	}
});
