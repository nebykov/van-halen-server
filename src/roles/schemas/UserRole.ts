import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/User';
import { Role } from './Role';
import * as mongoose from 'mongoose';


export type UserRoleDocument = UserRole & Document;

@Schema()
export class UserRole {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Role'})
    role: Role;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);