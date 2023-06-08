import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddTrackDto } from './dto/add-track.dto';

@Controller('albums')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Post('create')
    @UseInterceptors(FileInterceptor('picture'))
    createAlbum(@Body() dto: CreateAlbumDto, @UploadedFile() picture: Express.Multer.File) {
        return this.albumService.createAlbum(dto, picture)
    }

    @Get()
    getAllAlbums() {
        return this.albumService.getAlbums()
    }

    @Get(':albumId')
    getAlbumsById(@Param('albumId') albumId: string) {
        return this.albumService.getAlbumById(albumId)
    }

    @Post('/add')
    addTrackToAlbum(@Body() dto: AddTrackDto) {
        return this.albumService.addTrackToAlbum(dto)
    }
}
