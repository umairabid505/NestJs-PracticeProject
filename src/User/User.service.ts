import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService.service';
import { UpdateDto } from './dto/UpdateDto';
import { UserHelperService } from './userHelper.service';
import { SignupDto } from 'src/Auth/dto/SignupDto.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userHelperService: UserHelperService,
  ) {}

  async addUser(user: SignupDto) {
    const checkUser: SignupDto | null =
      await this.userHelperService.findUserByEmail(user.email);
    if (!checkUser) {
      const hashedPassword = await this.userHelperService.hashUserPassword(
        user.password,
      );
      return await this.prismaService.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
    }
    throw new HttpException(
      'User with this email already exists.',
      HttpStatus.CONFLICT,
    );
  }

  async getUser(req) {
    // console.log(req);
    // console.log(req.sub);

    return await this.prismaService.user.findUnique({
      where: { id: req.user.id },
      include: { todos: true },
    });
  }

  async updateUser(UpdateDto: UpdateDto, req) {
    return await this.prismaService.user.update({
      where: { id: req.user.id },
      data: UpdateDto,
    });
  }
}
