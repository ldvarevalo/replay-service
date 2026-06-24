import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../clients/http-client/http-client.service';
import { SearchItem } from './dto/search-item.dto';

interface DeezerAlbum {
  id: number;
  title: string;
  cover_big: string;
  release_date?: string;
  artist: { name: string };
}

interface DeezerSearchResponse {
  data?: DeezerAlbum[];
}

interface DeezerAlbumDetail {
  release_date?: string;
  genres?: { data?: { name: string }[] };
}

@Injectable()
export class MusicSearchService {
  private readonly baseUrl: string;

  constructor(
    private readonly http: HttpClientService,
    config: ConfigService,
  ) {
    this.baseUrl = config.get<string>('MUSIC_API_SEARCH_URL') ?? 'https://api.deezer.com';
  }

  async search(query: string): Promise<SearchItem[]> {
    const raw = await this.http.get<DeezerSearchResponse>(
      `${this.baseUrl}/search/album`,
      { q: query },
    );

    const items = (raw.data ?? []).map(
      (a): SearchItem => ({
        id: String(a.id),
        title: a.title,
        artist: a.artist.name,
        coverUrl: a.cover_big,
        year: a.release_date ? a.release_date.slice(0, 4) : '',
        genre: '',
      }),
    );

    return this.enrich(items.slice(0, 5));
  }

  // ponytail: inline enrichment, max 5 items, no cache layer yet
  private async enrich(items: SearchItem[]): Promise<SearchItem[]> {
    const results = await Promise.allSettled(
      items.map(async (item) => {
        const detail = await this.http.get<DeezerAlbumDetail>(
          `${this.baseUrl}/album/${item.id}`,
        );
        return {
          year: detail.release_date ? detail.release_date.slice(0, 4) : item.year,
          genre: detail.genres?.data?.[0]?.name ?? '',
        };
      }),
    );

    return items.map((item, i) => {
      if (results[i]?.status === 'fulfilled') {
        return { ...item, ...results[i].value };
      }
      return item;
    });
  }
}
