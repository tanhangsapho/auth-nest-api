import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './users.controller';

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
