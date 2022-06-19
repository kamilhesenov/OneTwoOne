import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PhoneEntity } from '../entities/phone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneDto } from './dto/phone.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(phoneDto: PhoneDto): Promise<PhoneEntity> {
    const user = await this.userRepository.findOne({
      where: { id: phoneDto.userId },
    });
    if (!user)
      throw new NotFoundException(
        `User with "${phoneDto.userId}" id Not Found`,
      );
    const phone = new PhoneEntity();
    phone.marka = phoneDto.marka;
    phone.model = phoneDto.model;
    phone.color = phoneDto.color;
    phone.user = user;
    const result = await this.phoneRepository.save(phone);
    return result;
  }

  async findAllPhones(): Promise<PhoneEntity[]> {
    return await this.phoneRepository
      .createQueryBuilder('phone')
      .leftJoinAndSelect('phone.user', 'user')
      .getMany();
  }

  async findPhoneById(id: number): Promise<PhoneEntity> {
    const phone = await this.phoneRepository
      .createQueryBuilder('phone')
      .where('phone.id = :id', { id })
      .leftJoinAndSelect('phone.user', 'user')
      .getOne();
    if (!phone) throw new NotFoundException(`Phone with "${id}" id Not Found`);
    return phone;
  }

  async update(id: number, phoneDto: PhoneDto): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: phoneDto.userId },
    });
    if (!user)
      throw new NotFoundException(
        `User with "${phoneDto.userId}" id Not Found`,
      );
    const { affected } = await this.phoneRepository.update(id, phoneDto);
    if (!affected)
      throw new NotFoundException(`Phone with "${id}" id Not Found`);
    return `Phone with "${id}" id updated`;
  }

  async delete(id: number): Promise<string> {
    const { affected } = await this.phoneRepository.delete(id);
    if (!affected)
      throw new NotFoundException(`Phone with "${id}" id Not Found`);
    return `Phone with "${id}" id deleted`;
  }
}
