import { Module } from '@nestjs/common';
import { AuthGuard } from './auth-guard';
import { SupabaseAuthStrategy } from './supabase-auth-strategy';
import type { AuthStrategy } from './auth-strategy.interface';

@Module({
  providers: [
    { provide: SupabaseAuthStrategy, useClass: SupabaseAuthStrategy },
    { provide: 'AuthStrategy', useExisting: SupabaseAuthStrategy },
    {
      provide: AuthGuard,
      useFactory: (s: AuthStrategy) => new AuthGuard(s),
      inject: ['AuthStrategy'],
    },
  ],
  exports: [AuthGuard],
})
export class SupabaseAuthModule {}
