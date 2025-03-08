
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if(user == null){
        throw new HttpException("Not valid id", HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try{
        return await this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    catch(err){
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({where: {email: data.email}})
    if(existingUser != null){
        throw new HttpException("Email is already used", HttpStatus.BAD_REQUEST);
    }
    try{
        return await this.prisma.user.create({data});
    }
    catch(err){
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        const existingUser = await this.prisma.user.findUnique({where})
        if(existingUser == null){
            throw new HttpException("Invalid userId", HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.prisma.user.update({
                data,
                where,
            });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
  }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        const user = await this.prisma.user.findUnique({where})
        if(user == null){
            throw new HttpException("Not valid id", HttpStatus.BAD_REQUEST);
        }
        
        try {
            return await this.prisma.user.delete({
                where,
            });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
  }
}
