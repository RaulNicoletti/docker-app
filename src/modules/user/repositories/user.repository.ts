import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user.repository.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '.prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async save(user: Partial<User>): Promise<User> {
    return this.prisma.user.create({
      data: { email: user.email, password: user.password },
    });
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async delete(id: number): Promise<User | null> {
    return this.prisma.user.delete({ where: { id } });
  }
}
