import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKER_SERVICE',
        transport: Transport.NATS,
        options: { servers: [process.env.NATS_URL] },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}