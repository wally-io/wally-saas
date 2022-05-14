import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("wallet_dapps", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        wallet_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        dapp_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("wallet_dapps")
}
