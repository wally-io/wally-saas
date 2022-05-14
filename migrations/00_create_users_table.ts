import { DataTypes, QueryInterface } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable("users", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: "email",
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    identifier: {
      allowNull: false,
      type: DataTypes.UUIDV4,
      unique: "identifier"
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  await queryInterface.addConstraint("users", {
    fields: ["email"],
    type: "unique",
    name: "unique_email",
  });
  await queryInterface.addConstraint("users", {
    fields: ["identifier"],
    type: "unique",
    name: "unique_identifier",
  });
};

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("users");
}