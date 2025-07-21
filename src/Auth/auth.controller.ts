import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto.dto';
import { SignupDto } from './dto/SignupDto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() user: SignupDto) {
    return this.authService.signup(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Request() req) {
    console.log('Entering in login controller');

    return this.authService.login(req.user);
  }
}
