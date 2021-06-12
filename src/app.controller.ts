import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  root() {}
  //   @Get()
  //   getHello() {
  //     return this.appService.getHello();
  //   }
}
