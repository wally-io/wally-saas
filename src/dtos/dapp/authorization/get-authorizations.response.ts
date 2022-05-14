import {TransactionType} from "../../../enums/transaction-type.enum"
import {TargetType} from "../../../enums/token-type.enum"

export interface DAppAuthorization {
    id: number,
    dappId: string,
    transactionType: TransactionType
    targetType: TargetType
    targetName: string
    targetAddress: string
    reason: string
}

export default interface GetDAppAuthorizationsResponse {
    authorizations: DAppAuthorization[]
}