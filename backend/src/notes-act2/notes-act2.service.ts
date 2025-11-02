import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteAct2 } from './note-act2.entity';
import { UserAct2 } from '../auth-act2/entities/user-act2.entity';

@Injectable()
export class NotesAct2Service {
  constructor(
    @InjectRepository(NoteAct2)
    private notesRepo: Repository<NoteAct2>,

    @InjectRepository(UserAct2)
    private usersRepo: Repository<UserAct2>,
  ) { }

  async create(userId: number, title: string, content: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const note = this.notesRepo.create({ title, content, user });
    return this.notesRepo.save(note);
  }



  async findAllByUser(userId: number) {
    return this.notesRepo.find({
      where: { user: { id: userId } },
      relations: ['user'], // optional, if you want to include user data
      order: { id: 'DESC' },
    });
  }

  async update(id: number, data: Partial<NoteAct2>) {
    const note = await this.notesRepo.findOne({ where: { id } });
    if (!note) throw new Error('Note not found');
    Object.assign(note, data);
    return this.notesRepo.save(note);
  }

  async delete(id: number) {
    return this.notesRepo.delete(id);
  }
}
