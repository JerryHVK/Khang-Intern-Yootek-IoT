import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    PostModule,
    ProfileModule,
    AuthModule,
    DeviceModule,
  ], 
})
export class AppModule {}
