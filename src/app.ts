import 'dotenv/config'
import express from "express"
import morgan from "morgan"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import pc from "picocolors"

import admin from 'firebase-admin'
import firebaseAuthKey from "../.secrets/wally-saas-firebase-admin.json"

import { sequelize, connectionParams } from "./db/database"
import { logger } from "./utils/logger"

import authRouter from "./routes/auth.route"
import authRegisterRouter from "./routes/auth-register.route"
import dappRouter from "./routes/dapp.route"
import dappAuthorizationsRouter from "./routes/dapp-authorizations.route"
import transactionRouter from "./routes/transaction.route"
import userRouter from "./routes/user.route"
import walletRouter from "./routes/wallet.route"
import walletDAppRouter from "./routes/wallet-dapp.route"
import walletRegisterRouter from "./routes/wallet-register.route"

import errorMiddleware from "./middleware/error.middleware"
import {HttpsProxyAgent} from "https-proxy-agent"

// Port
const PORT = process.env.PORT || 4000

const agent = new HttpsProxyAgent('127.0.0.1:7890');
admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(firebaseAuthKey)
});

const app = express()
app.use(morgan("combined"))
app.use(express.json())
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)

async function start() {
  // await sequelize.sync({
  //   // force: true,
  //   alter: true,
  // })
  await sequelize.authenticate({
    retry: {
      max: 5,
    },
  })
  logger.success("Database running at", pc.magenta(`http://${connectionParams.host}:3306`))
}

start()
  .then(() => {
      app.get("/", (_, res) => res.json("Wally SaaS Service OK"))
      app.get("/version", (_, res) => res.json({version: process.env.npm_package_version}))
      app.use(authRouter)
      app.use(authRegisterRouter)
      app.use(dappRouter)
      app.use(dappAuthorizationsRouter)
      app.use(transactionRouter)
      app.use(userRouter)
      app.use(walletRouter)
      app.use(walletDAppRouter)
      app.use(walletRegisterRouter)

    app.use(errorMiddleware)

    app.listen(PORT, () => {
      logger.success("Database running at", pc.magenta(`http://${connectionParams.host}:3306`))
      logger.success(pc.yellow(`Wally SaaS is running on port ${pc.green(`http://localhost:${PORT}`)}`))
    })
  })
  .catch(logger.error)
