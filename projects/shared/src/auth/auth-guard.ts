import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import type { AuthStrategy } from './auth-strategy.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly strategy: AuthStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;

    if (!auth?.startsWith('Bearer ')) {
      return false;
    }

    const token = auth.slice(7);
    return this.strategy.validate(token);
  }
}
