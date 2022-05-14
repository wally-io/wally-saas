import {TargetType, TransactionType} from "../../../enums"

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