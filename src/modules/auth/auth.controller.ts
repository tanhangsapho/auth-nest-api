import { Body,Request, Controller, Post, UnauthorizedException, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Post("/login")
  async login(@Body() req){
    const user = await this._authService.validateUser(req.email,req.password)
    if (!user) {
        throw new UnauthorizedException();
      }
    return this._authService.login(user)
  }
  @Post("/signup")
  async signUp(@Body() req){
    return this._authService.register(req.email,req.password)
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
