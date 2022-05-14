import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import WalletValidator from "../interfaces/wallet-validators.interface"
import {nanoid} from "nanoid"

export type WalletValidatorCreationAttributes = Optional<WalletValidator, "id" | "createdAt" | "updatedAt">

export class WalletValidatorModel
    extends Model<WalletValidator, WalletValidatorCreationAttributes>
    implements WalletValidator {
    public id: number
    public walletId: number
    public nonce: string
    public createdAt: Date
    public updatedAt: Date
}

export default (sequelize: Sequelize): typeof WalletValidatorModel => {
    WalletValidatorModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            walletId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: "wallet_id"
            },
            nonce: {
                allowNull: false,
                type: DataTypes.STRING(75),
                defaultValue: nanoid,
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
            modelName: "wallet_validators",
            sequelize,
            timestamps: true,
        },
    )

    return WalletValidatorModel
}
