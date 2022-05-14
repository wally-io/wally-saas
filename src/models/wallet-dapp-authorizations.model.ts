import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {WalletDAppAuthorization} from "../interfaces/wallet-dapp-authorizations.interface"

export type WalletDAppAuthorizationCreationAttributes = Optional<WalletDAppAuthorization, "id">

export class WalletDAppAuthorizationModel
    extends Model<WalletDAppAuthorization, WalletDAppAuthorizationCreationAttributes>
    implements WalletDAppAuthorization {
    public id: number
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
            dappAuthorizationId: {
                allowNull: false,
                type: DataTypes.STRING,
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
