import {IsNumber} from "class-validator"

export default class DeleteAuthorizationRequest {
    @IsNumber()
    authorizationId: number
}