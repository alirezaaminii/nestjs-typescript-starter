import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidationPipe } from '../common/pipes/UserValidation.pipe';
import { CreateUsersDto } from './dto/create-users.dto';
import { AppExceptionFilter } from '../common/errors/appException';
import { User } from '../common/decorators/user.decorator';
import { Auth } from '../common/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  create(@Body(new UserValidationPipe()) createUserDto: CreateUserDto) {
    console.log('[5 USERS CONTROLLER] create HIT');
    console.log('[5 USERS CONTROLLER] body:', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Post('bulk')
  bulk(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.bulk(createUsersDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('by-ids')
  @UseFilters(AppExceptionFilter)
  findByIds(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return this.usersService.findByIds(ids);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('username')
  getUsername(
    @User(new ValidationPipe({ validateCustomDecorators: true }))
    user: UserEntity,
  ) {
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
