import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { UsersModule } from 'src/users/users.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  providers: [SearchService],
  controllers: [SearchController],
  imports: [
    UsersModule,
    TracksModule
  ]
})
export class SearchModule {}
