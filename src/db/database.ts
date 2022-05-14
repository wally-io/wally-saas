import {Dialect, Sequelize} from "sequelize"

import UserModel from "../models/users.model"
import DAppsModel from "../models/dapps.model"
import WalletsModel from "../models/wallets.model"
import WalletDAppsModel from "../models/wallet-dapps.model"
import WalletValidatorsModel from "../models/wallet-validators.model"
import WalletDAppAuthorizationsModel from "../models/wallet-dapp-authorizations.model"
import DAppAuthorizationsModel from "../models/dapp-authorizations.model"
import TransactionsModel from "../models/transactions.model"

export const connectionParams = {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    dialect: "mysql" as Dialect,
    database: process.env.MYSQL_DB_NAME,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT!),
    pool: {
        min: 0,
        max: 5,
    },
    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        underscored: true,
        freezeTableName: true,
    },
    timezone: "+08:00",
    logQueryParameters: process.env.NODE_ENV === "development",
    benchmark: true,
}

const sequelize = new Sequelize(connectionParams)

sequelize.authenticate()

export {sequelize}

const db = {
    Users: UserModel(sequelize),
    Wallets: WalletsModel(sequelize),
    WalletDApps: WalletDAppsModel(sequelize),
    WalletValidators: WalletValidatorsModel(sequelize),
    WalletDAppAuthorizations: WalletDAppAuthorizationsModel(sequelize),
    DApps: DAppsModel(sequelize),
    DAppAuthorizations: DAppAuthorizationsModel(sequelize),
    Transactions: TransactionsModel(sequelize)
}

export default db
