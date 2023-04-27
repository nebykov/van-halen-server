import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
    @Prop()
    email: string;

    @Prop()
    TrackName: string;

    @Prop()
    password: string;

    @Prop()
    breed: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);