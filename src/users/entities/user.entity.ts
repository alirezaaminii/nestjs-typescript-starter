import { Role } from '../../common/enums/role.enum';
import { IsEnum, IsString, IsStrongPassword, IsBoolean } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhotoEntity } from './photo.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsStrongPassword()
  @Column()
  @Exclude()
  password: string;

  @IsEnum(Role)
  @Column({ type: 'enum', enum: Role })
  roles: Role[];

  @IsString()
  @Column()
  username: string;

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @OneToMany(() => PhotoEntity, (photo) => photo.user)
  photos: PhotoEntity[];

  @Expose()
  get FullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
