import { IsEmail, IsString } from 'class-validator';
import { EmailAlreadyExists } from 'src/common/validators/emailalreadyexist.service';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  @EmailAlreadyExists()
  // @DoesEmailAlreadyExists()
  email: string;

  @IsString()
  password: string;
}
