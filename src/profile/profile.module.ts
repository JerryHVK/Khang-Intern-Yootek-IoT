import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ProfileService, PrismaService],
  exports: [ProfileService] // export là để cho người ta dùng với nha
})
export class ProfileModule {}
