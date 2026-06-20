import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUsersDto } from './dto/create-users.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log('[7 USERS SERVICE] create start:', createUserDto);

    if (!createUserDto.password) {
      console.log('[7 USERS SERVICE] missing password');
      throw new BadRequestException('Password is required');
    }
    console.log('[7 USERS SERVICE] before bcrypt');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    console.log('[7 USERS SERVICE] after bcrypt');

    console.log('[7 USERS SERVICE] before DB save');
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    console.log('[7 USERS SERVICE] after DB save:', user.id);

    return this.usersRepository.save(user);
  }

  async bulk(createUsersDto: CreateUsersDto): Promise<UserEntity[]> {
    const users = this.usersRepository.create(createUsersDto.users);
    return this.usersRepository.save(users);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findByIds(ids: number[]): Promise<UserEntity[]> {
    return this.usersRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
  async findOne(id: number): Promise<UserEntity | undefined> {
    return this.usersRepository.findOneBy({ id });
  }
  async findOneWithUsername(username: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);

    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
