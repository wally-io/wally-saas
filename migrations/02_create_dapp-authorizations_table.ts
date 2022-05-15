import {DataTypes, QueryInterface} from "sequelize"
import {Migration} from "../umzug"

export const up: Migration = async ({context: queryInterface}: { context: QueryInterface }) => {
    await queryInterface.createTable("dapp_authorizations", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        dapp_id: {
            allowNull: false,
            type: DataTypes.UUID,
        },
        transaction_type: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        target_type: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        target_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        target_address: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        reason: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    })
}

export async function down({context: queryInterface}) {
    await queryInterface.dropTable("dapp_authorizations")
}
