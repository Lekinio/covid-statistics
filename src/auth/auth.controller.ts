import { Controller, Post, Request } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller({
  path: '/auth'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  async login(@Request() req) {
    const user = await this.authService.validateUser({
      email: req.body.email,
      password: req.body.password
    });
    return this.authService.login(user);
  }
}
