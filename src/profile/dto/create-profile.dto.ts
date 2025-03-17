import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @ApiProperty({example: 'the lamp in the room', description: 'write something you want people to know about you'})
    @IsString()
    @IsOptional()
    bio: string;

    @ApiProperty({example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw', description: 'paste the url link of your avatar here', required: false})
    @IsString()
    @IsOptional()
    avatar: string;
}
