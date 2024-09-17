import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [],
  imports: [ConfigModule.forRoot()],
})
export class CommonModule {}
