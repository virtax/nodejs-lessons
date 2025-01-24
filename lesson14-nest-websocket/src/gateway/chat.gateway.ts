import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

//@WebSocketGateway({ cors: { origin: '*' } }) // Дозволяємо підключення з будь-якого домену
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // NestJS сам створює екземпляр цього класу

  // Обробка повідомлення від клієнта
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Отримано повідомлення: ${message}  від  ${client.id}`);
    this.server.emit('message', message); // Відправляємо всім клієнтам
  }

  // Подія підключення нового користувача
  handleConnection(client: Socket) {
    console.log(`Користувач підключився: ${client.id}`);
    client.emit('message', 'Ласкаво просимо в чат!');

    // console.log('Користувачі', this.server.sockets);
  }

  // Подія відключення користувача
  handleDisconnect(client: Socket) {
    console.log(`Користувач відключився: ${client.id}`);
  }
}
