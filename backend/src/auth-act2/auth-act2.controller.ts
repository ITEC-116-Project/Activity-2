import { Controller, Post, Body } from '@nestjs/common';
import { AuthAct2Service } from './auth-act2.service';

@Controller('act2/auth')
export class AuthAct2Controller {
  constructor(private readonly authService: AuthAct2Service) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }
}
