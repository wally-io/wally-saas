import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import Wallet from "../interfaces/wallet.interface"

export type WalletCreationAttributes = Optional<Wallet, "id" | "createdAt" | "updatedAt">

export class WalletModel
    extends Model<Wallet, WalletCreationAttributes>
    implements Wallet {
    public id: string
    public address: string
    public createdAt: Date
    public updatedAt: Date
}

export default (sequelize: Sequelize): typeof WalletModel => {
    WalletModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
            },
            address: {
                allowNull: false,
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
            modelName: "wallets",
            sequelize,
            timestamps: true,
        },
    )

    return WalletModel
}
