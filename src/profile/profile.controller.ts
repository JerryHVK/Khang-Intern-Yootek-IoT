import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiBearerAuth()
  @Post()
  // create(@Param('id', ParseIntPipe) userId: number, @Body() createProfileDto: CreateProfileDto) {
  //   return this.profileService.create(userId, createProfileDto);
  // }
  @ApiBearerAuth()
  create(@Body() createProfileDto: CreateProfileDto, @Request() req) {
    return this.profileService.create(req.user.id, createProfileDto);
  }

  // @Get()
  // findAll() {
  //   return this.profileService.findAll();
  // }

  @ApiBearerAuth()
  @Get()
  findOne(@Request() req) {
    return this.profileService.findOne(req.user.id);
  }

  @ApiBearerAuth()
  @Patch()
  update(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(req.user.id, updateProfileDto);
  }

  @ApiBearerAuth()
  @Delete()
  remove(@Request() req) {
    return this.profileService.remove(req.user.id);
  }
}
