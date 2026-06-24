import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MusicSearchService } from './music-search.service';
import { HttpClientService } from '../../clients/http-client/http-client.service';

describe('MusicSearchService', () => {
  let service: MusicSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        MusicSearchService,
        HttpClientService,
        {
          provide: ConfigService,
          useValue: { get: () => 'https://api.deezer.com' },
        },
      ],
    }).compile();

    service = module.get<MusicSearchService>(MusicSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
