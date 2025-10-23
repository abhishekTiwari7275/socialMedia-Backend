import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Temporary user for testing
    request.user = { userId: 'test-user', name: 'Demo User' };
    return true; // allow request
  }
}
