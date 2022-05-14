import {TransactionType} from "../../../enums/transaction-type.enum"
import {TargetType} from "../../../enums/token-type.enum"

interface DAppAuthorization {
    authorized: boolean
    transactionType: TransactionType
    targetType: TargetType
    targetName: string
    targetAddress: string
    reason: string
}
export default interface FindAuthorizationsResponse {
    authorizations: DAppAuthorization[]
}