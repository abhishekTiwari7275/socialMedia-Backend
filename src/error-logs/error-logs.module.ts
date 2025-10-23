import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorLogsService } from './error-logs.service';
import { ErrorLog, ErrorLogSchema } from './error-log.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ErrorLog.name, schema: ErrorLogSchema }])],
  providers: [ErrorLogsService],
  exports: [ErrorLogsService],
})
export class ErrorLogsModule {}
