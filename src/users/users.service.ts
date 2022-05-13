import { Injectable } from '@nestjs/common';

import { UsersEntity } from '../database';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private userRepo: Repository<UsersEntity>;

  constructor(dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(UsersEntity);
  }

  async getByUserEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }
}
