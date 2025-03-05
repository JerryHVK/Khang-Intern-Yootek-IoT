import { Controller, Delete, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    create(@Body() createUserDTO: CreateUserDTO){
        return this.usersService.create(createUserDTO);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOneById(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDTO: CreateUserDTO) {
        return this.usersService.updateOneById(id, updateUserDTO);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteOneById(id);
    }
}
