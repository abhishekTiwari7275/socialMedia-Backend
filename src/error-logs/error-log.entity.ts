// error-log.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('error_logs')
export class ErrorLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  stack?: string;

  @Column({ nullable: true })
  context?: string;

  @CreateDateColumn()
  createdAt: Date;
}
