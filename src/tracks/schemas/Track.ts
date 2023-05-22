import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Album } from 'src/album/schemas/Album';
import { User } from 'src/users/schemas/User';
import { Comment } from './Comment';
import { type } from 'os';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
    @Prop()
    trackname: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop()
    picture: string

    @Prop()
    audio: string

    @Prop()
    likes: number

    @Prop()
    listens: number

    @Prop({type: Date, default: Date.now()})
    date: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Album'})
    album: Album;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    comments: Comment[]
}

export const TrackSchema = SchemaFactory.createForClass(Track);