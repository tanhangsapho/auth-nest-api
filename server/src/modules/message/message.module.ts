import { Module } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { MessageService } from "./message.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    providers: [MessageGateway, MessageService, PrismaService],
  })
  export class MessageModule {}