import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { hash } from 'bcryptjs'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await hash(createUserDto.password, 10)    
    const {identifiers} = await this.usersRepository.insert(createUserDto)
    return this.findOne(identifiers[0].id)
  }

  findAll() {
    return this.usersRepository.find({ select: ["id","name", "email"] });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id,{select:["id","name", "email"]}); 
    if(!user) throw new NotFoundException();
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {    
    if(updateUserDto.password){
      updateUserDto.password = await hash(updateUserDto.password, 10)    
    }
    await this.usersRepository.update(id,updateUserDto)    
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({email})
    if(!user) throw new NotFoundException();
    return user
  }

  async generateRandomUserPassword(id: number){
    const password = Math.random().toString(36).slice(-8);
    const user = await this.update(id,{password});
    if(!user) throw new NotFoundException();
    return {...user,newPassword:password}
  }
}
