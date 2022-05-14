import 'dotenv/config'
import express from "express"
import morgan from "morgan"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import pc from "picocolors"

import { sequelize, connectionParams } from "./db/database"
import { logger } from "./utils/logger"

import authRouter from "./routes/auth.route"
import authEthRouter from "./routes/wallet-register.route"
import authRegisterRouter from "./routes/auth-register.route"
import userRouter from "./routes/user.route"

import errorMiddleware from "./middleware/error.middleware"

// Port
const PORT = process.env.PORT || 4000

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
      app.use(authEthRouter)
      app.use(authRegisterRouter)
      app.use(userRouter)

    app.use(errorMiddleware)

    app.listen(PORT, () => {
      logger.success("Database running at", pc.magenta(`http://${connectionParams.host}:3306`))
      logger.success(pc.yellow(`Wally SaaS is running on port ${pc.green(`http://localhost:${PORT}`)}`))
    })
  })
  .catch(logger.error)
