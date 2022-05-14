import {IsArray, IsEnum, IsString, IsUrl, ValidateIf, ValidateNested} from "class-validator"
import {Type} from "class-transformer"
import {TargetType, TransactionType } from "../../enums"
import {isNotEmpty} from "../../utils/checks"

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

    @IsUrl()
    @ValidateIf((object, value) => isNotEmpty(value))
    public callback: string | null

    @IsArray()
    @ValidateNested({message: "Invalid authorization format"})
    @Type(() => DAppAuthorization)
    public authorizationRequest: DAppAuthorization[]
}