import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("wallets", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4,
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        fcm_token: {
            allowNull: true,
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
    await queryInterface.dropTable("wallets")
}
