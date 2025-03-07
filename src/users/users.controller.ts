import { Controller, Delete, Get, Post, Put, Body, Param, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user-dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    async create(@Body() createUserDTO: CreateUserDTO){
        try{
            const createdUser = await this.usersService.create(createUserDTO);
            return {
                statusCode: HttpStatus.CREATED,
                message: "success",
                body: createdUser
            }
        }
        catch(err){
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "fail",
                body: err
            }
        }
    }

    @Get()
    async findAll() {
        try{
            const allUser = await this.usersService.findAll();
            return {
                statusCode: HttpStatus.OK,
                message: "success",
                body: allUser
            }
        }
        catch(err){
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: "fail",
                body: err
            }
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        try{
            const user = await this.usersService.findOneById(id);
            return {
                statusCode: HttpStatus.OK,
                message: "success",
                body: user
            }
        }
        catch(err){
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: "fail",
                body: err
            }
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDTO: UpdateUserDTO) {
        try{
            const updatedUser = await this.usersService.updateOneById(id, updateUserDTO);
            return {
                statusCode: HttpStatus.OK,
                message: "success",
                body: updatedUser
            }
        }
        catch(err){
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: "fail",
                body: err
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        try{
            await this.usersService.deleteOneById(id);
            return {
                statusCode: HttpStatus.NO_CONTENT,
                message: "success",
                body: ""
            }
        }
        catch(err){
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: "fail",
                body: err
            }
        }
    }
}
