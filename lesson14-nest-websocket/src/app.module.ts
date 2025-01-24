import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  providers: [ChatGateway], // Реєструємо WebSocket-шлюз
})
export class AppModule {}
