import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { NoteAct2 } from '../../notes-act2/entities/note-act2.entity';

@Entity('users_act2')
export class UserAct2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => NoteAct2, (note) => note.user)
  notes: NoteAct2[];
}
