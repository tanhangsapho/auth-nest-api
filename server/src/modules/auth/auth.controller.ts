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
  UsePipes,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../common/guard/jwt.guard';
import { LoginSchema, SignUpSchema } from './schemas/login.schema';
import { IValidate } from './interface/auth.type';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { IUser } from '../users/interface/user.type';
import { GoogleAuthGuard } from '../common/guard/google.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() loginDto: IValidate) {
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
  @UsePipes(new ZodValidationPipe(SignUpSchema))
  async SignUp(@Body() user: IUser) {
    try {
      const data = await this._authService.register({
        userName: user.userName,
        email: user.email,
        password: user.password,
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

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    const token = await this._authService.validateGoogleUser(req.user);
    // Google redirects here after successful authentication
    res.redirect(`http://localhost:3000/chat?token=${token}`);
  }
}
