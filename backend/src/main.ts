import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // allow both
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  await app.listen(3000);
  console.log(`🚀 Server running on: http://localhost:3000`);
}
bootstrap();
