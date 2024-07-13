import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config";

class Users extends Model {
	id: string;
	email: string;
	password: string;
	salt: string;
	isActive: boolean;
}

Users.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{ sequelize, modelName: "users" }
);

export { Users };
