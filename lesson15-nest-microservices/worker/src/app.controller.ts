import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {

  @MessagePattern('convert.uppercase')
  handleUppercase(text: string): string {
    console.log('handleUppercase received:', text)
    return text.toUpperCase();
  }

  @EventPattern('test.event.created')
  handleEvent(text: string) {
    console.log('test.event.created handleEvent', text);
    return 'ignored return'
  }
}