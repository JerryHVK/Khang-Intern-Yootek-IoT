import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteManyModel, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user-dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async create(userDTO: CreateUserDTO) : Promise<User>{
        const existingUser = await this.usersRepository.findOneBy({email: userDTO.email});
        if(existingUser != null){
            throw new HttpException("Email is already used", HttpStatus.BAD_REQUEST);
        }
        
        try{
            const user = new User();
            user.name = userDTO.name;
            user.email = userDTO.email;
            user.address = userDTO.address;
            user.age = userDTO.age;
            user.gender = userDTO.gender;
            user.password = userDTO.password;

            return await this.usersRepository.save(user);
        }
        catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<User[]>{
        try{
            return await this.usersRepository.find();
        }
        catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findOneById(id: number): Promise<User|null>{
        const user = await this.usersRepository.findOneBy({id});
        if(user == null){
            throw new HttpException("Not valid id", HttpStatus.BAD_REQUEST);
        }
        return user;

    }

    async updateOneById(id: number, updateUserDTO: UpdateUserDTO): Promise<UpdateResult>{
        const user = await this.usersRepository.findOneBy({id});
        if(user == null){
            throw new HttpException("Not valid id", HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.usersRepository.update(id, updateUserDTO);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteOneById(id: number): Promise<DeleteResult>{
        const user = await this.usersRepository.findOneBy({id});
        if(user == null){
            throw new HttpException("Not valid id", HttpStatus.BAD_REQUEST);
        }
        return await this.usersRepository.delete(id);
    }
}

/*
@Injectable()
export class UsersService {
    private readonly users: any[] = [];
    private static counter = 1;

    create(user){
        this.users.push({
            id : UsersService.counter,
            info: user
        });
        UsersService.counter++;
    }

    findAll(){
        return this.users;
    }

    findOneById(id){
        const userIndex = this.users.findIndex(user => user.id == id);
        if (userIndex !== -1) {
            return this.users[userIndex];
        }
        return "no valid user's id"; // Return null if user not found
    }

    updateOneById(id, user){
        const userIndex = this.users.findIndex(user => user.id == id);
        if (userIndex !== -1) {
            this.users[userIndex].info = user;
            return this.users[userIndex];
        }
        return "no valid user's id"; // Return null if user not found
    }

    deleteOneById(id){
        const userIndex = this.users.findIndex(user => user.id == id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return "deleted successfully";
        }
        return "no valid user's id"; // Return null if user not found
    }
}
*/

