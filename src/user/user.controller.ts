import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    //FindAllUser
    @Get()
    async findAll(){
        try{
            const allUser = await this.userService.users({});
            return {
                statusCode: HttpStatus.OK,
                message: "success",
                body: allUser
            }
        }
        catch(err){
            return err;
        }
    }
    
    @Get('/:id')
    async findById(@Param('id', ParseIntPipe) id: number){
        try{
            const user = await this.userService.user({id});
            return {
                statusCode: HttpStatus.OK,
                message: "success",
                body: user
            }
        }
        catch(err){
            return err;
        }
    }

    @Post()
    async create(@Body() createUserDTO: CreateUserDTO){
        try{
            const createdUser = await this.userService.createUser(createUserDTO)
            return {
                statusCode: HttpStatus.CREATED,
                message: "success",
                body: createdUser
            }
        }
        catch(err){
            return err;
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDTO: UpdateUserDTO) {
        try{
            const updatedUser = await this.userService.updateUser({where: {id}, data: updateUserDTO});
            return {
                statusCode: HttpStatus.OK,
                message: "success",
                body: updatedUser
            }
        }
        catch(err){
            return err;
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        try{
            await this.userService.deleteUser({id});
            return {
                statusCode: HttpStatus.NO_CONTENT,
                message: "success",
                body: ""
            }
        }
        catch(err){
            return err;
        }
    }
}
