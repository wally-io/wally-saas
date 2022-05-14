import {TargetType} from "../enums/token-type.enum"
import {TransactionType} from "../enums/transaction-type.enum"

export interface DAppAuthorization {
    id: number,
    dappId: number,
    transactionType: TransactionType,
    targetType: TargetType,
    targetName: string,
    targetAddress: string,
    reason: string
}