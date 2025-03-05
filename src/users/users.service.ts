import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteManyModel, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user-dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    create(userDTO: CreateUserDTO) : Promise<User>{
        const user = new User();
        user.name = userDTO.name;
        user.email = userDTO.email;
        user.address = userDTO.address;
        user.age = userDTO.age;
        user.gender = userDTO.gender;

        return this.usersRepository.save(user);
    }

    findAll(): Promise<User[]>{
        return this.usersRepository.find();
    }

    findOneById(id: number): Promise<User|null>{
        return this.usersRepository.findOneBy({id});
    }

    updateOneById(id: number, updateUserDTO: UpdateUserDTO): Promise<UpdateResult>{
        return this.usersRepository.update(id, updateUserDTO);
    }

    deleteOneById(id: number): Promise<DeleteResult>{
        return this.usersRepository.delete(id);
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

