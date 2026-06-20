import { IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(Role)
  roles: Role[];
}
