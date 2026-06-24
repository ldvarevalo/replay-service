import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@replay-service/shared/src/auth';
import { MusicSearchService } from '@replay-service/shared/src/services/music-search/music-search.service';
import { SearchItem } from '@replay-service/shared/src/services/music-search/dto/search-item.dto';

@Controller('music')
@UseGuards(AuthGuard)
export class MusicController {
  constructor(private readonly musicSearch: MusicSearchService) {}

  @Get('search')
  async search(@Query('q') query: string): Promise<{ data: SearchItem[] }> {
    const data = await this.musicSearch.search(query);
    return { data };
  }
}
