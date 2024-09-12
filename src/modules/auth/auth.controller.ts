import {
  Body,
  Request,
  Controller,
  Post,
  UnauthorizedException,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './interface/SignUp.validate';
import { AuthGuard } from '../common/guard/jwt.guard';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this._authService.validateUser({
      email: loginDto.email,
      password: loginDto.password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return this._authService.login(user);
  }
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async SignUp(@Body() userDto: SignUpDto) {
    try {
      const data = await this._authService.register({
        userName: userDto.userName,
        email: userDto.email,
        password: userDto.password,
      });
      return {
        message: 'SignUp Successfully',
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
