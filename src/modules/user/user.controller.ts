import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Inject,
} from '@nestjs/common';
import { Response } from '../../types/request.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  IUserService,
  USER_SERVICE,
} from './interfaces/user.service.interface';
import { User } from '@prisma/client';
import { SkipAuth } from 'src/decorators/skip-auth.decorator';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @SkipAuth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const updated = await this.userService.update(+id, updateUserDto);
    const status = updated ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND;

    res.status(status).send();
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const deleted = await this.userService.remove(+id);
    const status = deleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND;

    res.status(status).send();
  }
}
