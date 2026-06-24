import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@shared/auth';
import { MusicSearchService } from '@shared/services/music-search/music-search.service';
import { SearchItem } from '@shared/services/music-search/dto/search-item.dto';

@Controller('music')
@UseGuards(AuthGuard)
export class MusicController {
  private readonly logger = new Logger(MusicController.name);

  constructor(private readonly musicSearch: MusicSearchService) {}

  @Get('search')
  async search(@Query('q') query: string): Promise<SearchItem[]> {
    try {
      return await this.musicSearch.search(query);
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }
}
