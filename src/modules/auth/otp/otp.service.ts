import { BadRequestException, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  constructor(private _prisma: PrismaService) {}
  // Generate OTP
  generateOtp() {
    const otp = randomInt(100000, 999999).toString(); // 6-digit OTP
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 3);
    return { otp, otpExpiry };
  }

  // Send OTP via email
  async sendOtp(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 3 minutes.`,
    };
    await transporter.sendMail(mailOptions);
  }
  // Store OTP in the database
  async storeOtp(userId: string, otp: string, otpExpiry: Date) {
    await this._prisma.user.update({
      where: { id: userId },
      data: { otpSecret: otp, otpExpiry },
    });
  }
  // Verify OTP
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const user = await this._prisma.user.findUnique({
      where: { email },
    });
    if (!user || user.otp !== otp) {
        throw new BadRequestException('OTP invalid');
      }
      const currentTime = new Date();
      if (user.otpExpiry < currentTime) {
        throw new BadRequestException('OTP expired');
      }

    return user.otpSecret === otp;
  }
}
