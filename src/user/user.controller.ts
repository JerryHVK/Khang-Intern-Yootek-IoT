import { Controller, Get, Param, Post, Body, Put, Delete, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user-dto';
import { UpdateUserDTO } from './dto/update-user-dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/role.enum';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    //FindAllUser
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
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
    
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get('/:id')
    async findById(@Param('id', ParseIntPipe) id: number){
        try{
            const user = await this.userService.user({id});
            if(user == null){
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "Invalid userId",
                }
            }
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

    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
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

    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
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

    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
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
