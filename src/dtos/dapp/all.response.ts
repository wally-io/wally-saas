import {TargetType, TransactionType} from "../../enums"

export interface DAppAuthorizationDto {
    transactionType: TransactionType
    targetType: TargetType
    targetName: string
    targetAddress: string
    reason: string
}

export interface DAppDto {
    id: string
    name: string
    callback: string | null
    authorizations: DAppAuthorizationDto[]
}

export default interface AllDAppResponse {
    dapps: DAppDto[]
}