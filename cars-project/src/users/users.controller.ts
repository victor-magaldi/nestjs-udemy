import { Body, Controller, Get, Param, Post, Patch, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import path from 'path';
import { UpdateUserDto } from './dtos/update-user-dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(`/:id`)
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(Number(id))
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email)
  }

  @Delete('/:id')
  removeUsers(@Param('id') id: string) {
    return this.usersService.remove(Number(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(Number(id), body)
  }
}
