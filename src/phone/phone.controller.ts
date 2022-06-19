import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneDto } from './dto/phone.dto';
import { PhoneEntity } from '../entities/phone.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('phone')
@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post()
  createPhone(@Body() phoneDto: PhoneDto): Promise<PhoneEntity> {
    return this.phoneService.create(phoneDto);
  }

  @Get()
  getAllPhones(): Promise<PhoneEntity[]> {
    return this.phoneService.findAllPhones();
  }

  @Get(':id')
  getPhoneById(@Param('id', ParseIntPipe) id: number): Promise<PhoneEntity> {
    return this.phoneService.findPhoneById(id);
  }

  @Put(':id')
  updatePhone(
    @Param('id', ParseIntPipe) id: number,
    @Body() phoneDto: PhoneDto,
  ): Promise<string> {
    return this.phoneService.update(id, phoneDto);
  }

  @Delete(':id')
  deletePhone(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.phoneService.delete(id);
  }
}
