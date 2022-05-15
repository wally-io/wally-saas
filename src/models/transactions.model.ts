import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import Transaction from "../interfaces/transaction.interface"
import {TransactionStatus} from "../enums"

export type TransactionCreationAttributes = Optional<Transaction, "id" | "createdAt" | "updatedAt">

export class TransactionModel
    extends Model<Transaction, TransactionCreationAttributes>
    implements Transaction {
    public id: string
    public walletAddress: string
    public dappId: string
    public status: TransactionStatus
    public result: string | null
    public createdAt: Date
    public updatedAt: Date
}

export default (sequelize: Sequelize): typeof TransactionModel => {
    TransactionModel.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
            },
            walletAddress: {
                allowNull: false,
                type: DataTypes.STRING,
                field: "wallet_address"
            },
            dappId: {
                allowNull: false,
                type: DataTypes.STRING,
                field: "dapp_id"
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING
            },
            result: {
                allowNull: true,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn("NOW"),
                field: "created_at"
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.fn("NOW"),
                field: "updated_at"
            }
        },
        {
            underscored: true,
            modelName: "transactions",
            sequelize,
            timestamps: true,
        },
    )

    return TransactionModel
}
