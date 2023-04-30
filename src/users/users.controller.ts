import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @Post(':id/roles')
    addRole(@Param('id') id: string, @Body('role') role: string) {
         return this.userService.addRole(id, role)
    }

    @Post(':id/roles/remove')
    removeRole(@Param('id') id: string, @Body('role') role: string) {
         return this.userService.removeRole(id, role)
    }
}
