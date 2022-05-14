import {IsString} from "class-validator"

export default class SetTransactionStartRequest {
    @IsString()
    transactionId: string
}