import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async checkExistingPost(postId: number){
    const existingPost = await this.prismaService.post.findUnique({where: {id: postId}});
    return existingPost;
  }

  async create(userId: number, createPostDto: CreatePostDto) {
    const newPost = await this.prismaService.post.create({
      data: {
        userId: userId,
        title: createPostDto.title,
        content: createPostDto.content
      }
    })

    return {
      statusCode: HttpStatus.CREATED,
      message: "Created new post successfully",
      data: newPost
    }
  }

  async findAll(userId: number) {
    const posts = await this.prismaService.post.findMany({where: {userId: userId}});
    return {
      statusCode: HttpStatus.OK,
      message: "success",
      data: posts
    }
  }

  async findOne(userId: number, postId: number) {
    const post = await this.checkExistingPost(postId);
    if(post == null){
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Invalid postId"
      }
    }

    return{
      statusCode: HttpStatus.OK,
      message: "Success",
      data: post
    }
  }

  async update(userId: number, postId: number, updatePostDto: UpdatePostDto) {
    const post = await this.checkExistingPost(postId);
    if(post == null){
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Invalid postId"
      }
    }

    const updatedPost = await this.prismaService.post.update({
      where: {userId: userId, id: postId},
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content
      }
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Updated post successfully",
      data: updatedPost
    }
  }

  async remove(userId: number, postId: number) {
    const post = await this.checkExistingPost(postId);
    if(post == null){
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Invalid postId"
      }
    }

    await this.prismaService.post.delete({where: {id: postId}});

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Deleted post successfully"
    }
  }
}
