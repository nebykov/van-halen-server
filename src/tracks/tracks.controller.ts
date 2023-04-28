import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('tracks')
export class TracksController {
    constructor(private trackService: TracksService) {}

    @Post()
    createTrack(@Body() dto: CreateTrackDto) {
        return this.trackService.createTrack(dto)
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
