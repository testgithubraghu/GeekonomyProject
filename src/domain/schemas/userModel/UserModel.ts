import { Model, DataTypes, Sequelize } from "sequelize";
import postgresConnection from "../../../core/postgres/PostgresConnector";

export const roleEnum = {
  ADMIN: "1001",
  USER: "1002",
};

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(roleEnum.ADMIN, roleEnum.USER),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: postgresConnection,
    modelName: "users",
    tableName: "users",
  },
);

export default UserModel;
