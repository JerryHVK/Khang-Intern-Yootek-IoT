import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService){}

  async checkExistingUser(userId: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({where: {id: userId}});
    if(user == null){
      return false;
    }
    return true;
  }

  async checkExistingProfile(userId: number){
    return await this.prismaService.profile.findUnique({where: {userId: userId}});
  }

  async create(userId: number, createProfileDto: CreateProfileDto) {
    const existingProfile = await this.checkExistingProfile(userId);
    if(existingProfile != null){
      return {
        statuscode: HttpStatus.BAD_REQUEST,
        message: "This profile has existed already"
      }
    }
    
    const newProfile = await this.prismaService.profile.create({
      data:{
        bio: createProfileDto.bio,
        avatar: createProfileDto.avatar,
        userId: userId
      }
    })

    return{
      statusCode: HttpStatus.CREATED,
      message: "Created profile successfully",
      data: newProfile
    }
  }

  // findAll() {
  //   return `This action returns all profile`;
  // }

  async findOne(userId: number) {
    const existingProfile = await this.checkExistingProfile(userId);
    if(existingProfile == null){
      return {
        statuscode: HttpStatus.BAD_REQUEST,
        message: "This user does not have a profile"
      }
    }
    return {
      statusCode: HttpStatus.OK,
      message: "success",
      data: existingProfile
    }
  }

  async update(userId: number, updateProfileDto: UpdateProfileDto) {
    const existingProfile = await this.checkExistingProfile(userId);

    if(existingProfile == null){
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "This user does not have a profile"
      }
    }

    const updatedProfile = await this.prismaService.profile.update({
      where: {userId: userId},
      data: updateProfileDto
    });
    
    return {
      statusCode: HttpStatus.OK,
      message: "Updated profile successfully",
      data: updatedProfile
    }
  }

  async remove(userId: number) {
    const existingProfile = await this.checkExistingProfile(userId);

    if(existingProfile == null){
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "This user has not had a profile"
      }
    }

    await this.prismaService.profile.delete({where: {userId: userId}});
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Deleted profile successfully"
    }
  }
}
