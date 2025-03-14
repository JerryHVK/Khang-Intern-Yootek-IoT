import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(req.user.id, createPostDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.postService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id', ParseIntPipe) postId: number) {
    return this.postService.findOne(req.user.id, postId);
  }

  @Patch(':id')
  update(@Request() req, @Param('id', ParseIntPipe) postId: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(req.user.id, postId, updatePostDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id', ParseIntPipe) postId: number) {
    return this.postService.remove(req.user.id, postId);
  }
}
