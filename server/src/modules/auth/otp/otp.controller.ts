import { Body, Controller, Post } from '@nestjs/common';
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
    // Find the user by email
    const user = await this.userService.findByEmail(email);
    // If the user is not found, return an error response
    if (!user) {
      throw new Error('User not found');
    }
    // Generate OTP and OTP expiry
    const { otp, otpExpiry } = this._otpService.generateOtp();
    // Send OTP via email (implement this logic in sendOtp method of your service)
    await this._otpService.sendOtp(email, otp);
    // Store OTP and its expiry for the user using userId
    await this._otpService.storeOtp(user.id, otp, otpExpiry);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    const isValid = await this._otpService.verifyOtp(email, otp);

    if (!isValid) {
      return { message: 'Invalid OTP' };
    }
    // Mark user as verified if OTP is valid
    // You can call another service or directly update the user's isVerified field here
    return { message: 'OTP verified successfully' };
  }
}
