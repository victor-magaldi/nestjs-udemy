import { Body, Controller, Get, Param, Post, Patch, Query } from '@nestjs/common';
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
  async findUser(@Param('id') id: string) {
    return this.usersService.findOne(Number(id))
  }
}
