import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard) // Protection des routes globalement en foha foha . 
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // inscriptions
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() requete: any) {
    return this.tasksService.create(createTaskDto, requete.user.userId);
  }

 // renvoyer toutes les taches
  @Get()
  findAll(
    @Request() requete: any,
    @Query('completed') completed?: string, // recupe des params de l' url
    @Query('priority') priority?: string,
  ) {
    return this.tasksService.findAll(
      requete.user.userId,
      completed !== undefined ? completed === 'true' : undefined,
      priority as any,
    );
  }

  // renvoyer  taches  precises
  @Get(':id')
  findOne(@Param('id') id: string, @Request() requete: any) {
    return this.tasksService.findOne(+id, requete.user.userId);
  }

  // modiffier  taches 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() requete: any) {
  return this.tasksService.update(+id, updateTaskDto, requete.user.userId);
}

// supprimer  tache 
@Delete(':id')
remove(@Param('id') id: string, @Request() requete: any) {
  return this.tasksService.remove(+id, requete.user.userId);
}
  // tache effectuer // completer

@Patch(':id/complete')
complete(@Param('id') id: string, @Request() requete: any) {
  return this.tasksService.complete(+id, requete.user.userId);
}


}