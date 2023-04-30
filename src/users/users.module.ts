import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/User';
import { Track, TrackSchema } from 'src/tracks/schemas/Track';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    FileModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Track.name, schema: TrackSchema }])
  ],

  exports: [MongooseModule, UsersService]
})
export class UsersModule {}