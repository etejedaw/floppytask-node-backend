import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config";

class Tasks extends Model {
	id: string;
	title: string;
	description: string;
	notes: string;
	estimatedTime: number;
	deadLine: Date;
	startDate: Date;
	endDate: Date;
	isDone: boolean;
}

Tasks.init(
	{
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
			type: DataTypes.FLOAT
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
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	},
	{ sequelize, modelName: "tasks" }
);

export { Tasks };
