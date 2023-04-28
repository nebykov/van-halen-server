import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

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

    @Post(':id/roles')
    addRole(@Param('id') id: string, @Body('role') role: string) {
         return this.userService.addRole(id, role)
    }

    @Post(':id/roles/remove')
    removeRole(@Param('id') id: string, @Body('role') role: string) {
         return this.userService.removeRole(id, role)
    }
}
