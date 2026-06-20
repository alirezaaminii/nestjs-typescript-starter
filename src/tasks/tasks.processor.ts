import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('tasks-queue')
export class TaskProcessor extends WorkerHost {
  async process(job: Job<any, any, string>) {
    console.log('processing job:', job.id, 'with data:', job.data);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('job completed:', job.data);
  }
}
