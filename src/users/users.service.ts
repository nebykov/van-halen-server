import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/User';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private trackModel: Model<UserDocument>) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.trackModel.create(dto)
        return user;
    }


    async getAllUsers() {
        const users = await this.trackModel.find()
        return users
    }

    async getOneUser(id: string) {
        const user = await this.trackModel.findById(id)
        return user
    }

    async addRole(id: string, role: string) {
        const user = await this.trackModel.findById(id)
        if (!user) {
            throw new HttpException('User not Found', HttpStatus.NOT_FOUND)
        }
        user.roles.push(role)
        user.save()
        return user
    }

    async removeRole(id: string, role: string) {
        const user = await this.trackModel.findById(id)
        console.log(role)
        if (!user) {
            throw new HttpException('User not Found', HttpStatus.NOT_FOUND)
        }
        if (!user.roles.includes(String(role))) {
            throw new HttpException('Role not Found', HttpStatus.NOT_FOUND)
        }
        const index = user.roles.indexOf(role)
        user.roles.splice(index, 1)
        user.save()
        return user
    }
}
