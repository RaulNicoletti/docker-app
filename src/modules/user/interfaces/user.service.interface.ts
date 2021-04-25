import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@prisma/client';

export const USER_SERVICE = Symbol('USER_SERVICE');

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<boolean>;
  remove(id: number): Promise<boolean>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findOne(
    id?: number,
    options?: FindOneOptions<User>,
  ): Promise<User | undefined>;
}
