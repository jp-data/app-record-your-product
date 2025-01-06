import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secretsecret',
      signOptions: { expiresIn: '72h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule { }
