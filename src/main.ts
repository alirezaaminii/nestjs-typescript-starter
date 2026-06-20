import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/errors/exceptionFIlter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ConsoleLogger({
      logLevels: ['error', 'warn', 'log'],
      timestamp: true,
      prefix: 'LOG',
    }),
  });
  app.setGlobalPrefix('api');
  app.use((req, res, next) => {
    console.log('[REQ]', req.method, req.originalUrl);

    res.on('finish', () => {
      console.log('[RES]', res.statusCode, req.method, req.originalUrl);
    });
    next();
  });
  app.set('query parser', 'extended');
  // app.use(logger)
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
