import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    const user = await this.userService.findUser(email)
    const isAuthenticatedUser = await bcrypt.compare(password, user.password)

    if (!isAuthenticatedUser || !user) {
      throw new HttpException(
        { message: 'Invalid credentials', error: 'InvalidCredentials' },
        HttpStatus.CONFLICT
      )
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
