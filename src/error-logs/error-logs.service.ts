// error-logs.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorLog } from './error-log.entity';

@Injectable()
export class ErrorLogsService {
  constructor(
    @InjectRepository(ErrorLog)
    private readonly errorLogRepo: Repository<ErrorLog>,
  ) {}

  async logError({
    message,
    stack,
    context,
  }: {
    message: string;
    stack?: string;
    context?: string;
  }) {
    const error = this.errorLogRepo.create({ message, stack, context });
    return this.errorLogRepo.save(error);
  }

  async findAll() {
    return this.errorLogRepo.find({ order: { createdAt: 'DESC' } });
  }
}
