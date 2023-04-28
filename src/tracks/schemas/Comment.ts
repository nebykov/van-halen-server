import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from './Track';
import { User } from 'src/users/schemas/User';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
    track: Track;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);