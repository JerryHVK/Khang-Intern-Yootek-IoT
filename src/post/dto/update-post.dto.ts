import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty({example: "Building a new temple inside", required: false})
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @ApiProperty({example: "The scientist detecting a new world that was very closed in the beginning", required: false})
    @IsString()
    @IsNotEmpty()
    content: string;
}
