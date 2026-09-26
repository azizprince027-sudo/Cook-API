import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto.js';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

// PartialType(CreateTaskDto) prend tous les champs de CreateTaskDto (title, description, priority) et les rend tous optionnels