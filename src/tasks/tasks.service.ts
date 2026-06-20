import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class TasksService {
  constructor(@InjectQueue('tasks-queue') private tasksQueue: Queue) {}

  async addTask(data: any) {
    await this.tasksQueue.add('task-job', data);
    return {
      message: 'Task added to queue',
      data,
    };
  }
}
