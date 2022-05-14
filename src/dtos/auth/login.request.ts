import {IsEmail, IsNotEmpty, IsString} from "class-validator"

export default class LoginRequest {
    @IsEmail(undefined, {message: "Please input a valid email address."})
    public email: string

    @IsString()
    @IsNotEmpty({message: "Password should not be empty."})
    public password: string
}