import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly _usersService: UserService,
        private readonly _jwtService: JwtService,
      ) {}
      async validateUser(email: string, password: string): Promise<any> {
        const user = await this._usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
          access_token: this._jwtService.sign(payload),
        };
      }
    
      async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this._usersService.createUser(
          email,
          hashedPassword,
        );
      }
}
