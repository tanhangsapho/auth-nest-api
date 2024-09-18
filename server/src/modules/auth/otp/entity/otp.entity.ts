import { IsUUID } from 'class-validator';

export class StoreOtpDto {
  @IsUUID()
  userId: string;
  otp: string;
  otpExpiry: Date;
}
