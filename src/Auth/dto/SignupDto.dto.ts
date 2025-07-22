import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { EmailAlreadyExists } from 'src/common/validators/emailalreadyexist.service';

export class SignupDto {
  @ApiProperty({
        example:"user-name",
        description:"Name of the user"
    })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email of the user',
  })
  @IsEmail()
  @EmailAlreadyExists()
  // @DoesEmailAlreadyExists()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user',
  })
  @IsString()
  password: string;
}
