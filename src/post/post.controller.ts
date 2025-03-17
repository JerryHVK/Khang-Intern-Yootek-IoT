import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(req.user.id, createPostDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.findOne(postId);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) postId: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(postId, updatePostDto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.remove(postId);
  }
}
