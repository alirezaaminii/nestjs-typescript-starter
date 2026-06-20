import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
// export class UpdateUserDto extends PickType(CreateUserDto, ['name']) {}
// export class UpdateUserDto extends OmitType(CreateUserDto, ['name']) {}
// export class UpdateUserDto extends IntersectionType(CreateUserDto, AdditionalUserInfo) {}
