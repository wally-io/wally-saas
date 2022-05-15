import {TransactionStatus} from "../../enums"
import {IsString} from "class-validator"

export default class FindTransactionsRequest {
    @IsString()
    status: TransactionStatus
}