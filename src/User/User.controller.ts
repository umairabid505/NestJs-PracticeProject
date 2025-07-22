import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtStrategy } from 'src/Auth/strategies/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'Got user data successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get()
  getUser(@Request() req) {
    console.log(req.user);

    return this.userService.getUser(req);
  }

  @ApiResponse({
    status: 200,
    description: 'User data updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBody({ type: UpdateUserDto })
  @Put()
  updateUser(@Body() UpdateUserDto: UpdateUserDto, @Request() req) {
    // console.log("I am in updateuser");

    return this.userService.updateUser(UpdateUserDto, req);
  }
}
