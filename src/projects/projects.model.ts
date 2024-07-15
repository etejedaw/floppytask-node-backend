import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config";
import { Users } from "../users/users.model";

class Projects extends Model {
	id: string;
	title: string;
	description: string;
	isActive: boolean;
	userId: string;
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

Users.hasMany(Projects, {
	foreignKey: "userId",
	sourceKey: "id"
});

Projects.belongsTo(Users, {
	foreignKey: "userId",
	targetKey: "id"
});

export { Projects };
