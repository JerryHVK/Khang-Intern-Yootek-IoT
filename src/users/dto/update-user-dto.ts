import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional } from "class-validator";

export class UpdateUserDTO{

    @IsString()
    @IsOptional()
    readonly name: string;

    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsString()
    @IsOptional()
    readonly password: string;

    @IsString()
    @IsOptional()
    readonly gender: string;

    @IsNumber()
    @IsOptional()
    readonly age: number;

    @IsString()
    @IsOptional()
    readonly address: string;
}