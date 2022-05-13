import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users';
import { UsersEntity } from '../database';
import { AuthCredentials } from '../interfaces/auth-credentials';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private static isPasswordValid(
    password: string,
    userPassword: string,
  ): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  async validateUser({
    email,
    password,
  }: AuthCredentials): Promise<UsersEntity> {
    const user = await this.userService.getByUserEmail(email);

    const match = AuthService.isPasswordValid(password, user?.password);
    if (match) {
      return user;
    }
    return null;
  }

  async login(user: UsersEntity) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }
}
