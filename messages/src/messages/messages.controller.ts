import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    console.log('ois')
    return `oi`
  }
  @Post()
  createMessage() {

  }
  @Get(`/:id`)
  getMessage() {

  }

}
