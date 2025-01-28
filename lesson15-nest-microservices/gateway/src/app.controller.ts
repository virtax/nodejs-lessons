import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('WORKER_SERVICE') private readonly client: ClientProxy) {}

  @Get('send')
  async convertToUppercase(@Query('message') text: string) {
    console.log('send:', text)
    return this.client.send('convert.uppercase', text);
  }

  @Get('publish')
  async publishEvent(@Query('message') text: string) {
    return this.client.emit('test.event.created', text);
  }
}