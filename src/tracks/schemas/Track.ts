import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Album } from 'src/album/schemas/Album';
import { User } from 'src/users/schemas/User';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    trackname: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Album'})
    album: Album;
}

export const TrackSchema = SchemaFactory.createForClass(Track);