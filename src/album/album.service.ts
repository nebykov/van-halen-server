import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from './schemas/Album';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { User, UserDocument } from 'src/users/schemas/User';
import { AddTrackDto } from './dto/add-track.dto';
import { Track, TrackDocument } from 'src/tracks/schemas/Track';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>
  ) { }

  async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    const author = await this.userModel.findById(dto.authorId)
    if (!author) {
      throw new HttpException('Author not Found', HttpStatus.NOT_FOUND)
    }
    const album = await this.albumModel.create({ ...dto, author: dto.authorId })
    author.createdAlbums.push(album._id)
    author.save()
    return album
  }

  async getAlbums(): Promise<Album[]> {
    const albums = await this.albumModel.find()
    return albums;
  }

  async getAlbumById(id: string): Promise<Album> {
         const album = await this.albumModel.findById(id)
         return album
  }

  async addTrackToAlbum(dto: AddTrackDto) {
       const track = await this.trackModel.findById(dto.trackId)
       if(!track) {
        throw new HttpException("Track Not Found", HttpStatus.NOT_FOUND)
       }
       const album = await this.albumModel.findById(dto.albumId)
       track.album = album._id
       track.save()
       album.tracks.push(track)
       album.save()
       return album;
  }

}
