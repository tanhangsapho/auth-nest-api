import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { UserService } from 'src/modules/users/user.service';

@Controller('auth/otp')
export class OtpController {
  constructor(
    private readonly _otpService: OtpService,
    private userService: UserService,
  ) {}
  @Post('send')
  async sendOtp(@Body('email') email: string) {

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const { otp, otpExpiry } = this._otpService.generateOtp();

    await this._otpService.sendOtp(email, otp);

    await this._otpService.storeOtp(user.id, otp, otpExpiry);

    return { message: 'OTP sent successfully' };
  }

  @Post('verify')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    const isValid = await this._otpService.verifyOtp(email, otp);

    if (!isValid) {
      return { message: 'Invalid OTP' };
    }

    return { message: 'OTP verified successfully' };
  }
}
