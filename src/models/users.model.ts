import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import * as bcrypt from "bcryptjs"
import User from "../interfaces/user.interface"

export type UserCreationAttributes = Optional<User, "id" | "createdAt" | "updatedAt">

export class UserModel extends Model<User, UserCreationAttributes> implements User {
    public id!: string
    public email!: string
    public password!: string
    public createdAt: Date
    public updatedAt: Date
    public comparePasswords: (password: string) => boolean
}

export default (sequelize: Sequelize): typeof UserModel => {
    // Init all models
    UserModel.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: "email",
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
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
            modelName: "users",
            sequelize,
            timestamps: true
        },
    )

    /**
     * Compare user provided password with DB password hash
     */
    UserModel.prototype.comparePasswords = function (password: string) {
        return bcrypt.compareSync(password, this.password)
    }

    /**
     * Deletes password from returned values
     */
    UserModel.prototype.toJSON = function (): {} {
        const values = Object.assign({}, this.get())
        delete values.password
        return values
    }

    return UserModel
}
