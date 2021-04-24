import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { hash, genSalt, compare } from 'bcrypt';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const findUser = await this.findByEmail(email);

    if (findUser) {
      throw new BadRequestException('Email já cadastrado.');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(
    id?: number,
    options?: FindOneOptions<User>,
  ): Promise<User> | undefined {
    return this.userRepository.findOne(id, options);
  }

  async findByEmail(email: string): Promise<User> | undefined {
    return this.userRepository.findOne(undefined, { where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const { email, password, oldPassword } = updateUserDto;

    const oldUser = await this.findOne(id);

    if (!oldUser) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const isMatch = await compare(oldPassword, oldUser.password);

    if (!isMatch) {
      throw new BadRequestException('Senha antiga inválida');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    const updated = await this.userRepository.update({ id }, user);
    return updated.affected === 1;
  }

  async remove(id: number): Promise<boolean> {
    const deleted = await this.userRepository.delete({ id });
    return deleted.affected === 1;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }
}
