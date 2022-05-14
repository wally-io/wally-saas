import {TransactionType} from "../../enums/transaction-type.enum"
import {TargetType} from "../../enums/token-type.enum"

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
    authorizations: DAppAuthorizationDto[]
}

export default interface AllDAppResponse {
    dapps: DAppDto[]
}