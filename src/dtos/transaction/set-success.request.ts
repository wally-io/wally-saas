import {IsString} from "class-validator"

export default class SetTransactionSuccessRequest {
    @IsString()
    transactionId: string
    @IsString()
    response: string
}