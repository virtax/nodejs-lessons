import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Render('index')
  getHello(): string {
    // return {
    //   message: 'Hi!',
    // };
    return this.appService.getHello();
  }
}
