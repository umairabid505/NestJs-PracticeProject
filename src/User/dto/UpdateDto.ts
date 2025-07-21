import { IsEmail, IsString } from "class-validator"

export class UpdateDto{
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string
}