import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"
import {MAX_INTEGER} from "ethereumjs-util"

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
        transaction: {
            allowNull: false,
            type: DataTypes.TEXT
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
