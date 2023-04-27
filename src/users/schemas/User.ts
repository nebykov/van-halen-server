import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Role } from 'src/roles/schemas/Role';
import { Track } from 'src/tracks/schemas/Track';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    email: string;

    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
    likedTracks: Track[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
    LikedAlbums: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);