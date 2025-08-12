import { Controller, Get } from "@nestjs/common";
@Controller('app')  // all routes start with /app
export class AppController {

  @Get('asdf')    //  GET /app/asdf
  getAsdf() {
    return 'Hi there';
  }

  @Get('by')      // GET /app/by
  getBy() {
    return 'by there';
  }
}
