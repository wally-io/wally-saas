import {TransactionStatus} from "../enums"

export default interface Transaction {
    id : string
    walletAddress: string
    dappId: string
    status: TransactionStatus
    result: string | null
    transaction: string
    createdAt: Date
    updatedAt: Date
}