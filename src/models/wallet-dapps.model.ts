import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {WalletDApp} from "../interfaces/wallet-dapps.interface"

export type WalletDAppCreationAttributes = Optional<WalletDApp, "id">

export class WalletDAppModel
    extends Model<WalletDApp, WalletDAppCreationAttributes>
    implements WalletDApp {
    public id: number
    public walletId: string
    public dappId: string
}

export default (sequelize: Sequelize): typeof WalletDAppModel => {
    WalletDAppModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            walletId: {
                allowNull: false,
                type: DataTypes.UUIDV4,
                field: "wallet_id"
            },
            dappId: {
                allowNull: false,
                type: DataTypes.UUIDV4,
                field: "dapp_id"
            }
        },
        {
            underscored: true,
            modelName: "wallet_dapps",
            sequelize,
            timestamps: false,
        },
    )

    return WalletDAppModel
}
