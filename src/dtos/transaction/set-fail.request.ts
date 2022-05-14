import {IsString} from "class-validator"

export default class SetTransactionFailRequest {
    @IsString()
    transactionId: string
    @IsString()
    error: string
}