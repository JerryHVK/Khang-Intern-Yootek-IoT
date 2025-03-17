import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: "Building a new temple inside"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example: "The scientist detecting a new world that was very closed in the beginning"})
    @IsString()
    @IsNotEmpty()
    content: string;
}
