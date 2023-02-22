import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {compare} from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService    
    ) {}

    async validateUser(username: string, pass: string){
        const user = await this.usersService.findOneByEmail(username);        
        const result = await compare(pass,user.password);
        if(result){
            const {password, ...result}= user
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, name: user.name };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    async forgotPassword(email: string){
        const user = await this.usersService.findOneByEmail(email)
        if(!user) throw new NotFoundException();
        return this.usersService.generateRandomUserPassword(user.id)
    }
}
