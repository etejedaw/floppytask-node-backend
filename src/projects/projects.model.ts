import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config";
import { Tasks } from "../tasks/tasks.model";

class Projects extends Model {
	id: string;
	title: string;
	description: string;
	isActive: boolean;
}

Projects.init(
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
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{ sequelize, modelName: "projects" }
);

Projects.hasMany(Tasks, {
	foreignKey: "project_id",
	sourceKey: "id"
});

Tasks.belongsTo(Projects, {
	foreignKey: "project_id",
	targetKey: "id"
});

export { Projects };
