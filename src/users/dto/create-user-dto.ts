import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional } from "class-validator";

export class CreateUserDTO{

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsOptional()
    readonly gender: string;

    @IsNumber()
    @IsNotEmpty()
    readonly age: number;

    @IsString()
    @IsOptional()
    readonly address: string;
}