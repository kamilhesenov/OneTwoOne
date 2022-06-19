import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('phone')
export class PhoneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marka: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @OneToOne((type) => UserEntity, (user) => user.phone, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Column()
  userId: number;
}
