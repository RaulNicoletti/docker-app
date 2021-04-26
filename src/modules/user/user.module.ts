import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { USER_SERVICE } from './interfaces/user.service.interface';
import { USER_REPOSITORY } from './interfaces/user.repository.interface';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_SERVICE],
})
export class UserModule {}
