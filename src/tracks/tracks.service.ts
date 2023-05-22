import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/Track';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/Comment';
import { User, UserDocument } from 'src/users/schemas/User';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class TracksService {
    constructor(
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private fileService: FileService
        ) {}

        async createTrack(dto: CreateTrackDto, picture, audio): Promise<Track> {
            const picturePath = this.fileService.createFile(dto.authorId, FileType.IMAGE, picture)
            const audioPath = this.fileService.createFile(dto.authorId, FileType.AUDIO, audio)
            const author =  await this.userModel.findById(dto.authorId)
            if(!author) {
                throw new HttpException('Author not found', HttpStatus.NOT_FOUND)
            }
            const track = await this.trackModel.create({...dto, likes: 0, listens: 0, picture: picturePath, audio: audioPath})
            track.author = author._id
            track.save()
            author.createdTracks.push(track)
            author.save()

            return track
        }

        async getAllTracks(): Promise<Track[]> {
            const tracks = await this.trackModel.find().populate('author')
            return tracks
        }

        async getOneTrack(id: string): Promise<Track> {
              const track = await this.trackModel.findById(id)
              if(!track) {
                throw new HttpException('Track not found', HttpStatus.NOT_FOUND)
              }

              return track;
        }


        async getFavoriteTracks(id: string): Promise<Track[]> {
               const user = await this.userModel.findById(id).populate({
                path: 'likedTracks',
                populate: {
                    path: 'author',
                    model: 'User'
                }
               })

               if (!user) {
                throw new HttpException('User was not found', HttpStatus.NOT_FOUND)
               }

               return user.likedTracks
        }
}
