import {TransactionStatus} from "../../enums"

export interface TransactionResponse {
    id: string
    walletAddress: string
    dappId: string
    status: TransactionStatus
    result: string | null
    createdAt: Date
    updatedAt: Date
}

export default interface AllTransactionsResponse {
    transactions: TransactionResponse[]
}