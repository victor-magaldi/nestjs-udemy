import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password)
  }

  @Get(`/:id`)
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(Number(id))
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        statusCode: 404
      })
    }
    console.log(user)

    return res.status(200).json(user)
  }
}
