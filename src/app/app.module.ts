import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/users/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule, UserModule, AuthModule],
})
export class AppModule {}
