import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schemas/User';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(dto: LoginDto) {
            const user = await this.validateUser(dto)
            const token = await this.generateToken(user)
            return token
    }


    async registration(dto: CreateUserDto) {
          const candidate = await this.usersService.getByEmail(dto.email)
          console.log(candidate)
          if(candidate) {
            throw new HttpException('User has already exist', HttpStatus.BAD_REQUEST)
          }
          const hashPassword = await bcrypt.hash(dto.password, 5)
          const user = await this.usersService.createUser({...dto, password: hashPassword})
          const token = await this.generateToken(user)
          return token;
    }

    async generateToken(user: UserDocument) {
          const payload = {email: user.email, id: user._id, roles: user.roles}
          return {
            token: await this.jwtService.signAsync(payload)
          }
    }

    async validateUser(dto: LoginDto) {
            const user = await this.usersService.getByEmail(dto.email)
            if(!user) {
              throw new HttpException('User does not exist', HttpStatus.FORBIDDEN)
            }
            const password = bcrypt.compareSync(dto.password, user.password)
            if (user && password) {
               return user
            }
            throw new HttpException('User or Password is not valid', HttpStatus.BAD_REQUEST)
    }
}
