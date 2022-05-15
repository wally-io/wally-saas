import {TargetType, TransactionType} from "../../enums"

export interface DAppAuthorizationResponse {
    transactionType: TransactionType
    targetType: TargetType
    targetName: string
    targetAddress: string
    reason: string
}

export interface DAppResponse {
    id: string
    name: string
    callback: string | null
    authorizations: DAppAuthorizationResponse[]
}

export default interface AllDAppResponse {
    dapps: DAppResponse[]
}