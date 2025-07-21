import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserHelperService } from "src/User/UserHelper.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userHelperService: UserHelperService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:"SECRET KEY"
        });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.userHelperService.findUserByEmail(payload.email)

        if(!user){
            throw new HttpException("User not found",HttpStatus.NOT_FOUND);
        }

        return user;
    }

}