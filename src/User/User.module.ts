import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { UserHelperService } from './UserHelper.service';
import { PrismaModule } from 'prisma/PrismaModule.module';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserHelperService],
  exports: [UserService, UserHelperService],
})
export class UserModule {}
