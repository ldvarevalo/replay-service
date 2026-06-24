import { Test, TestingModule } from '@nestjs/testing';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '@replay-service/shared/src/auth';
import { HttpClientModule } from '@replay-service/shared/src/clients/http-client/http-client.module';
import { MusicSearchService } from '@replay-service/shared/src/services/music-search/music-search.service';
import { MusicController } from '../src/controllers/music/music.controller';

describe('Music (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), HttpClientModule],
      controllers: [MusicController],
      providers: [MusicSearchService],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.setGlobalPrefix('api');
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
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
