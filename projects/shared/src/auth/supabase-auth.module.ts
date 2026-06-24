import { Module } from '@nestjs/common';
import { AuthGuard } from './auth-guard';
import { SupabaseAuthStrategy } from './supabase-auth-strategy';

@Module({
  providers: [
    { provide: 'AuthStrategy', useClass: SupabaseAuthStrategy },
    AuthGuard,
  ],
  exports: [AuthGuard, 'AuthStrategy'],
})
export class SupabaseAuthModule {}
