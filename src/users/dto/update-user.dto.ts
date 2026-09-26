import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// ici aussi  partialtype  herite de  ceate user dto mais il est juste optionelle 