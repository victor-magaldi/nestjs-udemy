import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { create } from 'domain';
import { stringify } from 'querystring';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }
  create(email: string, password: string) {
    const user = this.repo.create({ email, password }) // force dispatch hooks TypeOrm

    return this.repo.save(user)
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      select: ['id', 'email']
    })
  }
  find(email: string) {
    return this.repo.find({
      where: { email },
      select: ['id', 'email']
    })
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne({
      where: { id },
      select: ['id', 'email']
    })
    if (!user) {
      throw new NotFoundException("User not found")
    }
    Object.assign(user, attrs)

    return this.repo.save(user)
  }
  async remove(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      select: ['id', 'email']
    })
    if (!user) {
      throw new NotFoundException("User not found")
    }

    return this.repo.remove(user)
  }
}
