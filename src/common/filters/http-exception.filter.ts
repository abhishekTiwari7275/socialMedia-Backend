import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { ErrorLogsService } from '../../error-logs/error-logs.service'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly errorLogsService: ErrorLogsService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception instanceof HttpException ? exception.getStatus() : 500
    const message = exception instanceof HttpException ? exception.getResponse() : exception

    await this.errorLogsService.logError({
      message: (message as any).toString(),
      stack: (exception as any).stack || '',
      context: 'HTTP',
    })

    response.status(status).json({ statusCode: status, message })
  }
}
