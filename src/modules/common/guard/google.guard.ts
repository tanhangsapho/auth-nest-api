import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, lastValueFrom } from 'rxjs'; // Import RxJS to handle Observable

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  // You can override methods such as `canActivate` to add custom logic
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate = super.canActivate(context);

    // If the result is an Observable, convert it to a Promise
    if (activate instanceof Observable) {
      return lastValueFrom(activate); // Convert the Observable to a Promise
    }

    // Otherwise, return the boolean or Promise<boolean> directly
    return activate;
  }
  handleRequest(err, user, info) {
    // Custom error handling logic
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
