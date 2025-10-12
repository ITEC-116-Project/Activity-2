import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAct2Module } from './auth-act2/auth-act2.module';
import { NotesAct2Module } from './notes-act2/notes-act2.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'itec_116_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthAct2Module,
    NotesAct2Module,
  ],
})
export class AppModule {}
