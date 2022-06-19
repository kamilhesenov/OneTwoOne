import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { CarEntity } from '../entities/car.entity';
import { PhoneEntity } from '../entities/phone.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'kamil90',
  database: 'oneTwoOne',
  entities: [UserEntity, CarEntity, PhoneEntity],
  synchronize: true,
};
