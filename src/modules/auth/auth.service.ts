import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import {
  IUserService,
  USER_SERVICE,
} from '../user/interfaces/user.service.interface';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<Partial<User>> | null {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const { password, ...result } = user;
      const isMatch = await compare(plainPassword, password);

      if (isMatch) {
        return result;
      }
    }

    return null;
  }

  async login(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
