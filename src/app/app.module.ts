import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PostModule } from 'src/modules/post/post.module';
import { UserModule } from 'src/modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally without importing it everywhere
    }),
    AuthModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
