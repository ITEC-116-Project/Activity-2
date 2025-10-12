import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesAct2Service } from './notes-act2.service';
import { NotesAct2Controller } from './notes-act2.controller';
import { NoteAct2 } from './entities/note-act2.entity'; // ✅ corrected path
import { UserAct2 } from '../auth-act2/entities/user-act2.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteAct2, UserAct2])],
  controllers: [NotesAct2Controller],
  providers: [NotesAct2Service],
  exports: [TypeOrmModule], // ✅ optional but good if other modules use it
})
export class NotesAct2Module {}
