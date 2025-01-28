import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // https://docs.nestjs.com/faq/hybrid-application

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL]
    },
  });
  console.log(`Gateway connecting to NATS at ${process.env.NATS_URL}`);

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log('Gateway is running on port 3000');
}

bootstrap();


