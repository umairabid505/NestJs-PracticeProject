// src/common/validators/validator.module.ts
import { Module } from '@nestjs/common';
import { EmailAlreadyExistsConstraint } from './emailalreadyexist.service';
import { UserModule } from 'src/User/User.module';

@Module({
  imports: [UserModule], // Needed for UserHelperService injection
  providers: [EmailAlreadyExistsConstraint],
  exports: [EmailAlreadyExistsConstraint],
})
export class ValidatorModule {}
