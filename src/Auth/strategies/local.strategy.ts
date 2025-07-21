import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserHelperService } from 'src/User/userHelper.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userHelperService: UserHelperService) {
    // console.log('local constructor');
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    // console.log('Entering local');

    const user = await this.userHelperService.findUserByEmail(email);
    const isMatch = await this.userHelperService.compareUserPassword(
      password,
      user?.password,
    );
    if (!user || !isMatch) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    // automatically add user to the request.
    return user;
  }
}
