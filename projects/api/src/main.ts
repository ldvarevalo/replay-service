import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
