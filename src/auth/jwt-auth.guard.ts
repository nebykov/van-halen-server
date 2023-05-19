import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtSercice: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
       const authHeader = request.headers.authorization;
       const bearer = authHeader.split(' ')[0]
       const token = authHeader.split(' ')[1]

       if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({message: 'Authorization error'})
       }

       const decoded = this.jwtSercice.verify(token);
       request.user = decoded
       return true
    } catch (e) {
        throw new UnauthorizedException({message: 'Authorization error'})
    }
  }
}