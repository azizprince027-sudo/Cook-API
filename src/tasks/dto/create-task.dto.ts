import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Priority } from '../../generated/prisma/enums.js';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(Priority)
  priority: Priority;
}