import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import { AuthGuard } from './guard/guard';
import { SharedModule } from './utils/shared.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService]
})
export class AuthModule { }
