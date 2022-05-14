import {Model, DataTypes, Sequelize, Optional} from "sequelize"
import * as bcrypt from "bcryptjs"
import User from "../interfaces/users.interface"

export type UserCreationAttributes = Optional<User, "id" | "identifier" | "createdAt" | "updatedAt">

export class UserModel extends Model<User, UserCreationAttributes> implements User {
    public id!: number
    public email!: string
    public password!: string
    public identifier!: string
    public createdAt: Date
    public updatedAt: Date
    public comparePasswords: (password: string) => boolean
}

export default (sequelize: Sequelize): typeof UserModel => {
    // Init all models
    UserModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
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
            identifier: {
                allowNull: false,
                type: DataTypes.UUIDV4,
                unique: "identifier",
                defaultValue: DataTypes.UUIDV4
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