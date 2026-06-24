import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpClientModule } from '@shared/clients/http-client/http-client.module';
import { MusicSearchService } from '@shared/services/music-search/music-search.service';
import { MusicController } from '../src/controllers/music/music.controller';
import { createTestApp } from './utils/create-test-app';

describe('Music (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = await createTestApp({
      imports: [HttpClientModule],
      controllers: [MusicController],
      providers: [MusicSearchService],
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/music/search?q=test returns data', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/music/search?q=test',
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('GET /api/music/search without q returns 200', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/music/search',
    });

    expect(res.statusCode).toBe(200);
  });
});
