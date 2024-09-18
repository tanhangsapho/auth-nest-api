import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    readonly _configService: ConfigService,
    private readonly _prisma: PrismaService,
  ) {
    super({
      clientID: _configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: _configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: _configService.get<string>('GOOGLE_CALL_BACK'),
      scope: ['email', 'profile', 'openid'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    const email = emails[0].value;
    const firstName = name.givenName;
    const lastName = name.familyName;
    const picture = photos[0].value;

    let user = await this._prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this._prisma.user.create({
        data: {
          email,
          userName: `${firstName} ${lastName}`,
          googleId: profile.id,
          isVerified: true,
          picture: profile.photos[0].value,
        },
      });
    }

    // Pass the user object to the next step (done)
    done(null, user);
  }
}
