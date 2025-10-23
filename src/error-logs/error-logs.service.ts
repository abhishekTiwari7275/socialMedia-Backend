import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorLog, ErrorLogDocument } from './error-log.schema';

export interface LogErrorDto {
  message: string;
  stack?: string;
  context?: string;
}


@Injectable()
export class ErrorLogsService {
  constructor(
    @InjectModel(ErrorLog.name) private errorLogModel: Model<ErrorLogDocument>,
  ) {}

  async logError({ message, stack, context }: LogErrorDto) {
    const log = new this.errorLogModel({
      message,
      stack,
      context,
      createdAt: new Date(),
    });
    return log.save();
  }


  async findAll() {
    return this.errorLogModel.find().exec();
  }
}
