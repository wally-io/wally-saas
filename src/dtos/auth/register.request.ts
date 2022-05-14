import {IsEmail, IsString, Matches, MinLength} from "class-validator"
import {Match} from "../../validators/match.decorator"

export default class RegisterRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string

    @IsString()
    @MinLength(5, {message: "Password should contains at least 5 characters."})
    @Matches(/(?=.*[A-Za-z])(?=.*\d)|(?=.*[~`! @#$%^&*()_\-+={[}\]|\\:;"'<,>.?\/])[A-Za-z\d~`! @#$%^&*()_\-+={[}\]|\\:;"'<,>.?\/]$/, {message: 'Password is too weak.'})
    public password: string

    @IsString()
    @Match("password")
    public passwordConfirm: string
}