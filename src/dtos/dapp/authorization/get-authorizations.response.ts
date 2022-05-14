import {TargetType, TransactionType} from "../../../enums"

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