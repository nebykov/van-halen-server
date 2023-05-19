import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumModule } from './album/album.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SearchModule } from './search/search.module';
import * as path from 'path';

@Module({
  imports: [
    UsersModule,
    TracksModule, 
    AlbumModule, 
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://user:user@vanhalenrec.uigdnsi.mongodb.net/test'),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SearchModule
  ],
})
export class AppModule {}
