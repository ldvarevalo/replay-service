import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicSearchService } from '@replay-service/shared/src/services/music-search/music-search.service';
import { HttpClientModule } from '@replay-service/shared/src/clients/http-client/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [MusicController],
  providers: [MusicSearchService],
})
export class MusicModule {}
