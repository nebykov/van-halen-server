import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Album } from 'src/album/schemas/Album';
import { Track } from 'src/tracks/schemas/Track';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    email: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
    createdTracks: Track[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
    createdAlbums: Album[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
    likedTracks: Track[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
    LikedAlbums: Album[];

    @Prop({ type: [String], default: ['USER']})
    roles: [string];
    
}

export const UserSchema = SchemaFactory.createForClass(User);