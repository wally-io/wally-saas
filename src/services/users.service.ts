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

    public async getById(userId: string): Promise<UserModel> {
        const findUser = await this.findById(userId)
        throwIfNull(findUser, Errors.NOT_FOUND_UserId(userId))
        return findUser!;
    }

    public async getByEmail(email: string): Promise<UserModel> {
        const findUser = await this.findByEmail(email)
        throwIfNull(findUser, Errors.NOT_FOUND_UserEmail(email))
        return findUser!;
    }

    public async findById(userId: string): Promise<UserModel | null> {
        return await this.users.findByPk(userId);
    }

    public async findByEmail(email: string): Promise<UserModel | null> {
        return await this.users.findOne({
            where: {email: email}
        });
    }

    public async findByIds(userIds: number[]): Promise<UserModel[]> {
        return await this.users.findAll({
            where: {id: userIds}
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

    public async updateEmail(userId: string, newEmail: string): Promise<void> {
        if (await this.emailExists(newEmail)) {
            throw Errors.CONFLICT_Email(newEmail)
        }
        const user = await this.getById(userId)
        await user.update({
            email: newEmail,
        })
    }

    public async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
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