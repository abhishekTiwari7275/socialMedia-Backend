import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ErrorLogsService } from './error-logs/error-logs.service';
import * as express from 'express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const errorLogsService = app.get(ErrorLogsService)
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000'], // frontend origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // if you send cookies
  });

 // Enable file upload
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));


  app.useGlobalFilters(new AllExceptionsFilter(errorLogsService))
  await app.listen(process.env.BACKEND_PORT || 4000)
}
bootstrap()
