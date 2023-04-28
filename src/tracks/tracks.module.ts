import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schemas/Track';
import { CommentSchema, Comment } from './schemas/Comment';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    UsersModule
  ],

  exports: [MongooseModule]
})
export class TracksModule { }
