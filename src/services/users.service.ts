import db from "../db/database"
import User from "../interfaces/users.interface"
import * as bcrypt from "bcryptjs"
import {UserModel} from "../models/users.model"
import {redisDelSuffix} from "../utils/RedisClient"
import {throwIfNull} from "../utils/checks"
import Errors from "../utils/Errors"

class UserService {
    private users = db.Users;

    public async getAll(): Promise<User[]> {
        return await this.users.findAll();
    }

    public async getById(userId: number): Promise<UserModel> {
        const findUser = await this.users.findByPk(userId);
        throwIfNull(findUser, Errors.NOT_FOUND_UserId(userId))
        return findUser!;
    }

    public async getByEmail(email: string): Promise<UserModel> {
        const findUser = await this.findByEmail(email)
        throwIfNull(findUser, Errors.NOT_FOUND_UserEmail(email))
        return findUser!;
    }

    public async findById(id: number): Promise<UserModel | null> {
        return await this.users.findOne({
            where: {id: id}
        });
    }

    public async findByEmail(email: string): Promise<UserModel | null> {
        return await this.users.findOne({
            where: {email: email}
        });
    }

    public async findByIds(ids: number[]): Promise<UserModel[]> {
        return await this.users.findAll({
            where: {id: ids}
        });
    }

    public async findByEmails(emails: string[]): Promise<UserModel[]> {
        return await this.users.findAll({
            where: {email: emails}
        });
    }

    public async emailExists(email: string): Promise<boolean> {
        return await this.users.findOne({
            where: {email: email}
        }) != undefined
    }

    public async createUser(email: string, password: string): Promise<User> {

        if (await this.emailExists(email)) {
            throw Errors.CONFLICT_Email(email)
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        return await this.users.create({
            email: email,
            password: hashedPassword
        });
    }

    public async updateEmail(userId: number, newEmail: string): Promise<void> {
        if (await this.emailExists(newEmail)) {
            throw Errors.CONFLICT_Email(newEmail)
        }
        const user = await this.getById(userId)
        await user.update({
            email: newEmail,
        })
    }

    public async updatePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
        const user = await this.getById(userId)

        const isValidPassword = user.comparePasswords(oldPassword)

        if (!isValidPassword) {
            throw Errors.REJECTED_Password()
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await user.update({
            password: hashedPassword,
        })
    }

    public async resetPassword(email: string, newPassword: string): Promise<void> {
        const user = await this.getByEmail(email)

        await user.update({
            password: await bcrypt.hash(newPassword, 10)
        })
        await redisDelSuffix(`${user.id}_`)
    }
}

export const userService = new UserService()