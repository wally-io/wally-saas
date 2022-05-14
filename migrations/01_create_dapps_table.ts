import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("dapps", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.UUIDV4,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: "name",
        },
        owner_id: {
            allowNull: false,
            type: DataTypes.UUIDV4
        },
        callback: {
            allowNull: true,
            type: DataTypes.STRING
        }
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("dapps")
}
