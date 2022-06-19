import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  marka: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  color: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
