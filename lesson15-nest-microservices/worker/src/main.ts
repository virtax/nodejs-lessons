import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  // https://docs.nestjs.com/microservices/nats

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL],
    },
  });
  console.log(`Worker connecting to NATS at ${process.env.NATS_URL}`);
  await app.listen();
}

bootstrap();


