import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService, ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '2h' },
            }),
            inject: [ConfigService],
            global: true
        })
    ],
    exports: [JwtModule]
})

export class SharedModule { }