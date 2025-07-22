import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class UpdateUserDto{
    @ApiProperty({example:"user-name"})
    @IsString()
    name: string

    @ApiProperty({example:"user@gmail.com"})
    @IsEmail()
    email: string

    @ApiProperty({example:"password123"})
    @IsString()
    password: string
}