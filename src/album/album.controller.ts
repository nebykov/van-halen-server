import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Post('create')
    createAlbum(@Body() dto: CreateAlbumDto) {
        return this.albumService.createAlbum(dto)
    }

    @Get()
    getAllAlbums() {
        return this.albumService.getAlbums()
    }
}
