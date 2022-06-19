import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CarEntity } from './car.entity';
import { PhoneEntity } from './phone.entity';

@Entity('users')
export class UserEntity {
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne((type) => CarEntity, (car) => car.user)
  car: CarEntity;

  @OneToOne((type) => PhoneEntity, (phone) => phone.user)
  phone: PhoneEntity;
}
