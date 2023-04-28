import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/Album';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [
    TracksModule,
    UsersModule,
    MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}])
  ]
})
export class AlbumModule {}
