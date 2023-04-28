import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from 'src/tracks/schemas/Track';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name , schema: TrackSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class SharedModule {}