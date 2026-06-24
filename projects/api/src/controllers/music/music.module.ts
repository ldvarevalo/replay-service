import { Module } from '@nestjs/common';
import { SupabaseAuthModule } from '@shared/auth';
import { MusicController } from './music.controller';
import { MusicSearchService } from '@shared/services/music-search/music-search.service';
import { HttpClientModule } from '@shared/clients/http-client/http-client.module';

@Module({
  imports: [HttpClientModule, SupabaseAuthModule],
  controllers: [MusicController],
  providers: [MusicSearchService],
})
export class MusicModule {}
