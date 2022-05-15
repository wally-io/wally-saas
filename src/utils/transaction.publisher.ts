import {logger} from "./logger"
import admin from "firebase-admin"

const options = {
    priority: "high"
}

export const publish = (token: string, transactionId: string, transaction: string) => {
    const payload = {
        notification: {
            title: transactionId,
            body: transaction
        }
    }

    logger.log("Prepare transaction: ", payload)
    admin.messaging().sendToDevice(token, payload, options)
        .then(function (response) {
            logger.success(`Transaction sent to client ${token} [${transactionId}]`)
        })
        .catch(function (error) {
            logger.error(error)
        })
}