import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserService } from './interfaces/user.service.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from './interfaces/user.repository.interface';
import { User } from '@prisma/client';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const findUser = await this.userRepository.findByEmail(email);

    if (findUser) {
      throw new BadRequestException('Email já cadastrado.');
    }

    const hashedPassword = await this.hashPassword(password);

    const user: Partial<User> = {
      email,
      password: hashedPassword,
    };

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const { email, password, oldPassword } = updateUserDto;

    const oldUser = await this.userRepository.findById(id);

    if (!oldUser) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const isMatch = await compare(oldPassword, oldUser.password);

    if (!isMatch) {
      throw new BadRequestException('Senha antiga inválida');
    }

    const hashedPassword = await this.hashPassword(password);

    const user: Partial<User> = {
      email,
      password: hashedPassword,
    };

    const updated = await this.userRepository.update(id, user);
    console.log(updated);
    if (updated) return true;
    return false;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findByEmail(email);
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.userRepository.delete(id);
    console.log(deleted);
    if (deleted) return true;
    return false;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }
}
