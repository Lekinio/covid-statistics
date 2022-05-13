import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: {
    expiresIn: '7d',
  },
};
