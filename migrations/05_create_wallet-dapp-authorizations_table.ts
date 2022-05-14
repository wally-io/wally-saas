import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("wallet_dapp_authorizations", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        wallet_id: {
            allowNull: false,
            type: DataTypes.UUIDV4,
        },
        dapp_id: {
            allowNull: false,
            type: DataTypes.UUIDV4,
        },
        dapp_authorization_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        authorized: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        }
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("wallet_dapp_authorizations")
}
