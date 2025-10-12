import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserAct2 } from './entities/user-act2.entity';

@Injectable()
export class AuthAct2Service {
  constructor(
    @InjectRepository(UserAct2)
    private usersRepo: Repository<UserAct2>,
  ) {}

  async register(username: string, password: string) {
    const existing = await this.usersRepo.findOne({ where: { username } });
    if (existing) throw new Error('Username already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ username, password: hashed });
    return this.usersRepo.save(user);
  }

  async login(username: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) throw new Error('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');
    return user;
  }
}
