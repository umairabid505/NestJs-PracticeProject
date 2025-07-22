import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class LoginDto{

    @ApiProperty({
        example:"user@gmail.com",
        description:"Email of the user"
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example:"password123",
        description:"Password of the user"
    })
    @IsString()
    password: string
}