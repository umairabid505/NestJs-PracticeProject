import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './User.service';
import { UpdateDto } from './dto/UpdateDto';
import { JwtStrategy } from 'src/Auth/strategies/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Request() req) {
    console.log(req.user);

    return this.userService.getUser(req);
  }

  @Put()
  updateUser(@Body() updateDto: UpdateDto, @Request() req) {
    // console.log("I am in updateuser");

    return this.userService.updateUser(updateDto, req);
  }
}
