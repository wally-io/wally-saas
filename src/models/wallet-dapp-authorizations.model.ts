import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {WalletDAppAuthorization} from "../interfaces/wallet-dapp-authorizations.interface"

export type WalletDAppAuthorizationCreationAttributes = Optional<WalletDAppAuthorization, "id">

export class WalletDAppAuthorizationModel
    extends Model<WalletDAppAuthorization, WalletDAppAuthorizationCreationAttributes>
    implements WalletDAppAuthorization {
    public id: number
    public walletId: string
    public dappId: string
    public dappAuthorizationId: number
    public authorized: boolean
}

export default (sequelize: Sequelize): typeof WalletDAppAuthorizationModel => {
    WalletDAppAuthorizationModel.init(
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
            },
            dappAuthorizationId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                field: "dapp_authorization_id"
            },
            authorized: {
                allowNull: false,
                type: DataTypes.BOOLEAN
            }
        },
        {
            underscored: true,
            modelName: "wallet_dapp_authorizations",
            sequelize,
            timestamps: false,
        },
    )

    return WalletDAppAuthorizationModel
}
