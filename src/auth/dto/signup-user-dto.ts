import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional } from "class-validator";

export class SignupUserDTO{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    address: string;
}