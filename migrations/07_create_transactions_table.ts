import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("transactions", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        result: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        wallet_address: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        dapp_id: {
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
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("transactions")
}
