import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {DAppAuthorization} from "../interfaces/dapp-authorizations.interface"
import {TransactionType} from "../enums/transaction-type.enum"
import {TargetType} from "../enums/token-type.enum"

export type DAppAuthorizationCreationAttributes = Optional<DAppAuthorization, "id">

export class DAppAuthorizationModel
    extends Model<DAppAuthorization, DAppAuthorizationCreationAttributes>
    implements DAppAuthorization {
    public id: number
    public dappId: string
    public transactionType: TransactionType
    public targetType: TargetType
    public targetName: string
    public targetAddress: string
    public reason: string
}

export default (sequelize: Sequelize): typeof DAppAuthorizationModel => {
    DAppAuthorizationModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            dappId: {
                allowNull: false,
                type: DataTypes.UUIDV4,
                field: "dapp_id"
            },
            transactionType: {
                allowNull: false,
                type: DataTypes.STRING,
                field: "transaction_type"
            },
            targetType: {
                allowNull: false,
                type: DataTypes.STRING,
                field: "target_type"
            },
            targetName: {
                allowNull: false,
                type: DataTypes.STRING,
                field: "target_name"
            },
            targetAddress: {
                allowNull: false,
                type: DataTypes.STRING,
                field: "target_address"
            },
            reason: {
                allowNull: false,
                type: DataTypes.STRING,
            }
        },
        {
            underscored: true,
            modelName: "dapp_authorizations",
            sequelize,
            timestamps: false,
        },
    )

    return DAppAuthorizationModel
}
