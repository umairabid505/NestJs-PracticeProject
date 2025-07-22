import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto.dto';
import { SignupDto } from './dto/SignupDto.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'New user added', type: SignupDto })
  @ApiOperation({ description: 'Add new user' })
  @Post('/signup')
  signup(@Body() user: SignupDto) {
    return this.authService.signup(user);
  }

  @ApiResponse({ status: 200, description: 'User login successfully'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Login the user' })
  @ApiBody({ type: LoginDto })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Request() req) {
    console.log('Entering in login controller');

    return this.authService.login(req.user);
  }
}
