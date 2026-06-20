import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronTask {
  @Cron(CronExpression.EVERY_2_HOURS)
  handleCron() {
    console.log('cron job executed EVERY_2_HOURS at', new Date().toISOString());
  }
}
