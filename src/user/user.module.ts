import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  imports: [ProfileModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService] // export ra cho người ta dùng với
})
export class UserModule {}
