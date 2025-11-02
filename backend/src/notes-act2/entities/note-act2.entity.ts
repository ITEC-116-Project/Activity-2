import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserAct2 } from '../../auth-act2/entities/user-act2.entity';

@Entity('notes_act2')
export class NoteAct2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @ManyToOne(() => UserAct2, (user) => user.notes, { onDelete: 'CASCADE', nullable: true })
  user: UserAct2;
}
