import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Add PrismaModule here
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
