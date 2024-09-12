import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from './interface/user.type';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userData: IUser): Promise<User> {
    const { email, password,userName } = userData; // Destructure email and password from userData

    return this.prisma.user.create({
      data: {
        email,
        password,
        userName,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  async findbyId(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
}
