import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('tracks')
export class TracksController {
    constructor(private trackService: TracksService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
      ]))
    createTrack(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
        const {picture, audio} = files
        return this.trackService.createTrack(dto, picture[0], audio[0])
    }

    @Get()
    getAllTracks() {
        return this.trackService.getAllTracks()
    }

    @Get(':id')
    getOneTrack(@Param('id') id: string) {
         return this.trackService.getOneTrack(id)
    }
}
