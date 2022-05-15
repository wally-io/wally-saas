import { DataTypes, QueryInterface } from "sequelize";
import { Migration } from "../umzug";

export const up: Migration = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable("users", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
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
};

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("users");
}
