import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { Request } from '../../types/request.type';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { SkipAuth } from 'src/decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
