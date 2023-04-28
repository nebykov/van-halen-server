import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from './schemas/Album';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { User, UserDocument } from 'src/users/schemas/User';

@Injectable()
export class AlbumService {
    constructor(
        @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
        ) {}

    async createAlbum(dto: CreateAlbumDto) {
          const author = await this.userModel.findById(dto.authorId)
          if(!author) {
            throw new HttpException('Author not Found', HttpStatus.NOT_FOUND)
          }
          
    }
}
