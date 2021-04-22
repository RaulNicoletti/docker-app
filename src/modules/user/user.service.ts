import { User } from '@entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User[]> {
    return this.userRepository.find({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const user = new User();

    user.email = updateUserDto.email;
    user.password = updateUserDto.password;

    await this.userRepository.update({ id }, user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
