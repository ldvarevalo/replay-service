import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import type { AuthStrategy } from './auth-strategy.interface';

@Injectable()
export class SupabaseAuthStrategy implements AuthStrategy {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    );
  }

  async validate(token: string): Promise<boolean> {
    const { data, error } = await this.supabase.auth.getUser(token);
    return !error && !!data.user;
  }
}
