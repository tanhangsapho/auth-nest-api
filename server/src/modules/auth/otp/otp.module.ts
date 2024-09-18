import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [OtpController],
  providers: [OtpService, PrismaService],
})
export class OtpModule {}
