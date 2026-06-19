import { IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  url: string;

  @IsString()
  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => UserEntity, (user) => user.photos)
  user: UserEntity;
}
