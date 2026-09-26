import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}