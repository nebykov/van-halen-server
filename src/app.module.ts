import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumModule } from './album/album.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    TracksModule, 
    AlbumModule, 
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://user:user@vanhalenrec.uigdnsi.mongodb.net/test')
  ],
})
export class AppModule {}
