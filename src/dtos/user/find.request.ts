import {IsEmail, IsNumberString, ValidateIf} from "class-validator"
import {isNotEmpty} from "../../utils/checks"

export default class UserFindRequest {
    @IsEmail()
    @ValidateIf((object, value) => isNotEmpty(value))
    public email: string | undefined

    @IsNumberString()
    @ValidateIf((object, value) => isNotEmpty(value))
    public userId: string | undefined
}