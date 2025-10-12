import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAct2Service } from './auth-act2.service';
import { AuthAct2Controller } from './auth-act2.controller';
import { UserAct2 } from './entities/user-act2.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAct2])],
  providers: [AuthAct2Service],
  controllers: [AuthAct2Controller],
  exports: [TypeOrmModule, AuthAct2Service],
})
export class AuthAct2Module {}
