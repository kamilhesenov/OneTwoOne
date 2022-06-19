import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntity } from '../entities/car.entity';
import { Repository } from 'typeorm';
import { CarDto } from './dto/car.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(carDto: CarDto): Promise<CarEntity> {
    const user = await this.userRepository.findOne({
      where: { id: carDto.userId },
    });
    if (!user)
      throw new NotFoundException(`User with "${carDto.userId}" id Not Found`);
    const car = new CarEntity();
    car.name = carDto.name;
    car.color = carDto.color;
    car.user = user;
    const result = await this.carRepository.save(car);
    return result;
  }

  async findAllCars(): Promise<CarEntity[]> {
    return await this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.user', 'user')
      .getMany();
  }

  async findCarById(id: number): Promise<CarEntity> {
    const car = await this.carRepository
      .createQueryBuilder('car')
      .where('car.userId = :id', { id })
      .leftJoinAndSelect('car.user', 'user')
      .getOne();
    if (!car) throw new NotFoundException(`Car with "${id}" id Not found`);
    return car;
  }

  async update(id: number, carDto: CarDto): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: carDto.userId },
    });
    if (!user)
      throw new NotFoundException(`User with "${carDto.userId}" id Not Found`);
    const { affected } = await this.carRepository.update(id, carDto);
    if (!affected) throw new NotFoundException(`Car with "${id}" id Not found`);
    return `Car with "${id}" id updated`;
  }

  async delete(id: number): Promise<string> {
    const { affected } = await this.carRepository.delete(id);
    if (!affected) throw new NotFoundException(`Car with "${id}" id Not found`);
    return `Car with "${id}" id deleted`;
  }
}
