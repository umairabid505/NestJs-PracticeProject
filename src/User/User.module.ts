import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserHelperService } from './userHelper.service';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserHelperService],
  exports: [UserService, UserHelperService],
})
export class UserModule {}
