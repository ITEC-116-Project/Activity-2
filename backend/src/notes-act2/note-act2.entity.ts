import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserAct2 } from 'src/auth-act2/entities/user-act2.entity';


@Entity('notes_act2')
export class NoteAct2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => UserAct2, (user) => user.notes, { onDelete: 'CASCADE' })
  user: UserAct2;
}
