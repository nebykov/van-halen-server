import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from 'src/tracks/schemas/Track';
import { User, UserDocument } from 'src/users/schemas/User';

@Injectable()
export class SearchService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Track.name) private trackModel: Model<TrackDocument>
    ) {}

    async globalSearch(value: string) {
        const author = await this.userModel.findOne({
            username: { $regex: new RegExp(value, 'i') },
            roles: {$regex: new RegExp('AUTHOR')}
        })

        const tracks = await this.trackModel.find({
            trackname: {$regex: new RegExp(value, 'i')}
        })

        if (tracks.length > 4) {
          const slicedTracks = tracks.slice(0, 4)

            return {
                author: author || null,
                tracks: slicedTracks || []
              };
        }

        if (!author && !tracks.length) {
            return null;
        }

        return {
            author: author || null,
            tracks: tracks || [],
          };
    }
}
