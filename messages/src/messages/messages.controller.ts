import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    console.log('ois')
    return `oi`
  }
  @Post()
  createMessage(@Body() body: any) {
    console.log(body)
  }
  @Get(`/:id`)
  getMessage(@Param('id') id: string) {
    console.log(id)
  }

}
