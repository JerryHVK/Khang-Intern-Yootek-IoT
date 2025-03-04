import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user-dto';

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
