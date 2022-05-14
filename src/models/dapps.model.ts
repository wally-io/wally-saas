import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import {DApp} from "../interfaces/dapps.interface"

export type DAppCreationAttributes = Optional<DApp, "id">

export class DAppModel
    extends Model<DApp, DAppCreationAttributes>
    implements DApp {
    public id!: string
    public name!: string
    public ownerId!: string
}

export default (sequelize: Sequelize): typeof DAppModel => {
    DAppModel.init(
        {
            id: {
                autoIncrement: true,
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
                type: DataTypes.UUIDV4,
                field: "owner_id"
            }
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
