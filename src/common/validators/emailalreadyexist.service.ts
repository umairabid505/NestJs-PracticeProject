// src/common/validators/decorator/emailalreadyexist.ts

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserHelperService } from 'src/User/UserHelper.service';

@ValidatorConstraint({ async: true })
@Injectable() // ✅ allows Nest to inject services
export class EmailAlreadyExistsConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserHelperService) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    // ✅ FIXED: avoid crashing if not injected
    if (!this.userService) {
      console.error('UserHelperService is not injected!');
      return false;
    }

    const user = await this.userService.findUserByEmail(email);
    return !user; // valid only if email not found
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email $value already exists';
  }
}

// ✅ Must export this function
export function EmailAlreadyExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailAlreadyExistsConstraint, // only works if constraint is DI-resolved
    });
  };
}
