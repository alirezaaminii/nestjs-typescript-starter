import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DynamicScheduleService } from '../common/tasks/dynamicSchedule.service';
import { TaskProcessor } from './tasks.processor';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'tasks-queue',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskProcessor],
})
export class TasksModule {}
