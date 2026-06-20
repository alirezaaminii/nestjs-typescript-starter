import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class DynamicScheduleService {
  constructor(private scheduleRegistry: SchedulerRegistry) {}

  addCron(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      console.log(
        `dynamic cron ${name} executed at ${new Date().toISOString()}`,
      );
    });
    this.scheduleRegistry.addCronJob(name, job);
    job.start();
  }

  addInterval(name: string, ms: number) {
    const interval = setInterval(() => {
      console.log(
        `dynamic cron ${name} executed at ${new Date().toISOString()}`,
      );
    }, ms);
    this.scheduleRegistry.addInterval(name, interval);
  }

  addTimeout(name: string, ms: number) {
    const timeout = setTimeout(() => {
      console.log(
        `dynamic cron ${name} executed at ${new Date().toISOString()}`,
      );
    }, ms);
    this.scheduleRegistry.addTimeout(name, timeout);
  }
}
