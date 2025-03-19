import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService){}
  
  async createEmptyProfile(userId: number) {
    const newProfile = await this.prismaService.profile.create({
      data:{
        bio: null,
        avatar: null,
        userId: userId
      }
    })
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const updatedProfile = await this.prismaService.profile.update({
      where: {userId: userId},
      data: updateProfileDto
    });
  }
}
