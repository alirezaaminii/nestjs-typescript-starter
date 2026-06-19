import { SetMetadata, UseGuards } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

import { applyDecorators } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../roles/roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
