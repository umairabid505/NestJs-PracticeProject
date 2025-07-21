import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/User/user.service';
import { SignupDto } from './dto/SignupDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: SignupDto) {
    return this.userService.addUser(user);
  }

  async login(user: User) {
    // idhar id kaisy use kary sub ky andar UserDto ki wajah sy user.id error dy raha hai.
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
