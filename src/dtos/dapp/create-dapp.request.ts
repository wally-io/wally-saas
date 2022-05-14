import {TransactionType} from "../../enums/transaction-type.enum"
import {TargetType} from "../../enums/token-type.enum"
import {IsArray, IsEnum, IsString, ValidateNested} from "class-validator"
import {Type} from "class-transformer"

export class DAppAuthorization {
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

export default class CreateDappRequest {
    @IsString()
    public name: string

    @IsArray()
    @ValidateNested({message: "Invalid authorization format"})
    @Type(() => DAppAuthorization)
    public authorizationRequest: DAppAuthorization[]
}