import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseAuthModule } from '@replay-service/shared/src/auth';
import { HttpClientModule } from '@replay-service/shared/src/clients/http-client/http-client.module';
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
