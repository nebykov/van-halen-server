import { Body, Controller, Get, Param, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { ObjectId } from 'mongoose';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
 

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto)
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }

    @Get(':id')
    getOneUser(@Param('id') id: string) {
          return this.userService.getOneUser(id)
    }

    @Post('add_avatar')
    @UseInterceptors(FileInterceptor('avatar'))
    addAvatar(@Body('userId') userId: string, @UploadedFile() avatar: Express.Multer.File) {
        return this.userService.addAvatar(userId, avatar)
    }

    @Post('roles/add/:id')
    addRole(@Param('id') id: string, @Body('role') role: string) {
         return this.userService.addRole(id, role)
    }

    @Post('roles/remove/:id')
    removeRole(@Param('id') id: string, @Body('role') role: string) {
         return this.userService.removeRole(id, role)
    }

    @UseGuards(AuthGuard)
    @Get('favorite/tracks/add/:trackId')
    addToFavorite(@Param('trackId') trackId: ObjectId, @Req() req) {
       return this.userService.addFavoriteTracks(req, trackId)
    }

    @UseGuards(AuthGuard)
    @Get('favorite/tracks/remove/:trackId')
    removeFromFavorite(@Param('trackId') trackId, @Req() req) {
       return this.userService.removeFavoriteTracks(req, trackId)
    }
}
