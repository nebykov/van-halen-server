import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/User';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { FileService, FileType } from 'src/file/file.service';
import { AddFavTrackDto } from './dto/add-favoritesong.dto';
import { Track, TrackDocument } from 'src/tracks/schemas/Track';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        private fileService: FileService
    ) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userModel.create(dto)
        return user;
    }


    async getAllUsers() {
        const users = await this.userModel.find()
        return users
    }

    async getOneUser(id: string) {
        const user = await this.userModel.findById(id)
        return user
    }

    async getByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email })
        return user
    }

    async addAvatar(userId: string, picture: any): Promise<User> {
        const user = await this.userModel.findById(userId)
        if (!user) {
            throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
        }
        const picturePath = await this.fileService.createFile(userId, FileType.IMAGE, picture)
        user.avatar = picturePath
        user.save()
        return user
    }

    async addRole(id: string, role: string) {
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new HttpException('User not Found', HttpStatus.NOT_FOUND)
        }
        user.roles.push(role)
        user.save()
        return user
    }

    async removeRole(id: string, role: string) {
        const user = await this.userModel.findById(id)
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

    async addFavoriteTracks(req, trackId: ObjectId) {
        try {
            const user = await this.userModel.findById(req?.user?.id)
            const track = await this.trackModel.findById(trackId)
            if (!user) {
                throw new HttpException('User Was Not Found', HttpStatus.NOT_FOUND)
            }
            if (user.likedTracks.indexOf(track.id) === -1) {
                user.likedTracks.push(track.id)
                console.log(trackId)
                await user.save()
            }

            return user
        } catch (e) {
             throw new HttpException(`${e}`, HttpStatus.BAD_GATEWAY)
        }
    }


    async removeFavoriteTracks(req, trackId) {
        const user = await this.userModel.findById(req?.user?.id)
        const track = await this.trackModel.findById(trackId)
        if (!user) {
            throw new HttpException('User Was Not Found', HttpStatus.NOT_FOUND)
        }
        const trackIndex = user.likedTracks.findIndex((c) => c === trackId)
        if (user.likedTracks.indexOf(track.id) !== -1) {
            user.likedTracks.splice(trackIndex, 1)
            await user.save()
            return user
        }

        throw new HttpException('UnlikeError', HttpStatus.BAD_REQUEST)
    }
}
