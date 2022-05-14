import {IsEnum, IsString, IsUUID} from "class-validator"
import {TargetType, TransactionType} from "../../../enums"

export default class AddAuthorizationRequest {
    @IsUUID()
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