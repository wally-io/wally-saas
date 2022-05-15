import {TransactionStatus} from "../../enums"

export interface TransactionResponse {
    id: string
    walletAddress: string
    dappId: string
    status: TransactionStatus
    result: string | null
    transaction: string
    createdAt: Date
    updatedAt: Date
}

export default interface AllTransactionsResponse {
    transactions: TransactionResponse[]
}