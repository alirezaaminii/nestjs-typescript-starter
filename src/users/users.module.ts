import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './entities/photo.entity';
import { UserSubscriber } from './subscribers/user.subscribers';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PhotoEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserSubscriber],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
