import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface payloadUser {
  sub: string
  username: string
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async login(email: string, password: string) {
    const user = await this.userService.findUser(email)
    const isAuthenticatedUser = await bcrypt.compare(password, user.password)

    if (!isAuthenticatedUser) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: payloadUser = {
      sub: user.id,
      username: user.name
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
