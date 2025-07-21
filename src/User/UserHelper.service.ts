import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserHelperService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async hashUserPassword(password : string){
    return await bcrypt.hash(password,10);
  }

  async compareUserPassword(inputPassword: string,dbPassword){
    return await bcrypt.compare(inputPassword,dbPassword);
  }
}
