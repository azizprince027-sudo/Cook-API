import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { Priority } from '../generated/prisma/enums.js';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId: userId,
      },
    });
  }

  // findMany retourne un tableau de toutes les lignes qui correspondent au critère du where
  async findAll(userId: number, completed?: boolean, priority?: Priority) {
    return this.prisma.task.findMany({
      where: {
        userId: userId,// tache de utilisateurs precis
        ...(completed !== undefined && { completed }),
        ...(priority && { priority }),
      },
    });
  }

// recuperation de 1 taches
 async findOne(id: number, userId: number) {
  const tache = await this.prisma.task.findFirst({
    where: {
      id: id,
      userId: userId,
    },
  });

  if (!tache) {
    throw new NotFoundException('Tâche introuvable');
  }

  return tache;
}
// Moddification
  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    await this.findOne(id, userId); // // vérifie que la tâche existe et appartient à l'utilisateur
    return this.prisma.task.update ({
      where: { id: id },
    data: updateTaskDto
    });
  }
// tache supprimer
async remove(id: number, userId: number) {
  await this.findOne(id, userId); // mm vérification

  return this.prisma.task.delete({
    where: { id: id },
  });
}
// tache complete
async complete(id: number, userId: number) {
  await this.findOne(id, userId);

  return this.prisma.task.update({
    where: { id: id },
    data: { completed: true },
  });
}
}