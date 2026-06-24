import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '@replay-service/shared/src/auth';

interface TestAppOptions {
  imports?: any[];
  controllers?: any[];
  providers?: any[];
}

export const createTestApp = async (
  opts: TestAppOptions,
): Promise<NestFastifyApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule.forRoot({ isGlobal: true }), ...(opts.imports ?? [])],
    controllers: opts.controllers ?? [],
    providers: opts.providers ?? [],
  })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return app;
};
