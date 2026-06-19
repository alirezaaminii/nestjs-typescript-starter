import { HttpException, HttpStatus } from '@nestjs/common';

export class MyForbiddenException extends HttpException {
  constructor() {
    super('this is my customize error', HttpStatus.FORBIDDEN);
  }
}
