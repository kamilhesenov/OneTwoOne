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
import { CarService } from './car.service';
import { CarEntity } from '../entities/car.entity';
import { ApiTags } from '@nestjs/swagger';
import { CarDto } from './dto/car.dto';

@ApiTags('car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  createCar(@Body() carDto: CarDto): Promise<CarEntity> {
    return this.carService.create(carDto);
  }

  @Get()
  getAllCars(): Promise<CarEntity[]> {
    return this.carService.findAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number): Promise<CarEntity> {
    return this.carService.findCarById(id);
  }

  @Put(':id')
  updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body() carDto: CarDto,
  ): Promise<string> {
    return this.carService.update(id, carDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.carService.delete(id);
  }
}
