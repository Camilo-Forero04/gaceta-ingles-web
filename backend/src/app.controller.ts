import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Health check (usado por Railway y monitoreo)
  @Get()
  getHealth() {
    return this.appService.getHealth();
  }
}
