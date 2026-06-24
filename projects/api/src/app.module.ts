import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseAuthModule } from '@shared/auth';
import { HttpClientModule } from '@shared/clients/http-client/http-client.module';
import { MusicModule } from './controllers/music/music.module';
import { appConfig, supabaseConfig, musicConfig } from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, supabaseConfig, musicConfig],
      isGlobal: true,
    }),
    SupabaseAuthModule,
    HttpClientModule,
    MusicModule,
  ],
})
export class AppModule {}
