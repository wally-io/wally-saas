import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {DApp} from "../interfaces/dapp.interface"

export type DAppCreationAttributes = Optional<DApp, "id">

export class DAppModel
    extends Model<DApp, DAppCreationAttributes>
    implements DApp {
    public id!: string
    public name!: string
    public ownerId!: string
    public callback: string | null
}

export default (sequelize: Sequelize): typeof DAppModel => {
    DAppModel.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: "name"
            },
            ownerId: {
                allowNull: false,
                type: DataTypes.UUID,
                field: "owner_id"
            },
            callback: {
                allowNull: true,
                type: DataTypes.STRING
            },
        },
        {
            underscored: true,
            modelName: "dapps",
            sequelize,
            timestamps: false,
        },
    )

    return DAppModel
}
