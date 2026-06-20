import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('add')
  async addTask(@Body() body: any) {
    return this.tasksService.addTask(body);
  }
}
