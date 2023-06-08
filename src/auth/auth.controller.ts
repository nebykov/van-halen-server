import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard)
    @Get()
    auth(@Req() req) {
         return this.authService.auth(req)
    }

    @Post('registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto)
    }

    @Post('login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto)
    }
}
