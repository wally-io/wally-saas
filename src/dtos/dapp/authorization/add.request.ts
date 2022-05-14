import {TransactionType} from "../../../enums/transaction-type.enum"
import {TargetType} from "../../../enums/token-type.enum"
import {IsEnum, IsString} from "class-validator"

export default class AddAuthorizationRequest {
    @IsString()
    public dappId: string
    @IsEnum(TransactionType)
    public transactionType: TransactionType
    @IsEnum(TargetType)
    public targetType: TargetType
    @IsString()
    public targetName: string
    @IsString()
    public targetAddress: string
    @IsString()
    public reason: string
}