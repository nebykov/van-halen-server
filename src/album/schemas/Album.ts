import { User } from 'src/users/schemas/User';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from 'src/tracks/schemas/Track';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
    @Prop()
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    author: User;

    @Prop()
    picture: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]})
    tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);