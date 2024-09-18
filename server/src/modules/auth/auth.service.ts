import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../users/interface/user.type';
import { ILogin, IValidate } from './interface/auth.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UserService,
    private readonly _jwtService: JwtService,
    readonly configService: ConfigService,
  ) {}
  async validateUser(userData: IValidate): Promise<any> {
    const user = await this._usersService.findByEmail(userData.email);
    if (!user) {
      throw new NotFoundException('Credentials Fail');
    }
    if (!(await bcrypt.compare(userData.password, user.password))) {
      throw new BadRequestException('Email or Password are incorrect');
    }
    return { id: user.id, data: user.userName };
  }
  async login(user: ILogin) {
    const payload = { userName: user, sub: user.id };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
  async register(userData: IUser) {
    const existingUser = await this._usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException(
        'Email already have,Please try another email.',
      );
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this._usersService.createUser({
      userName: userData.userName,
      email: userData.email,
      password: hashedPassword,
    });
  }

  async validateGoogleUser(user: any) {
    // Find or create the user in the database
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
