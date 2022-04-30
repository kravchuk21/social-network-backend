import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    example: 'a676123hiafo231',
    description: 'Уникальный идинтификатор',
  })
  @Transform(({ value }) => value.toString())
  id: string;

  @Prop({ required: 'Обязательное поле' })
  @ApiProperty({
    example: 'Vladislav Kravchuk',
    description: 'Имя пользователя',
  })
  name: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({ example: 'test@gmail.com', description: 'Почта пользователя' })
  email: string;

  @Prop({ required: true })
  @ApiProperty({ example: '123456qwerty', description: 'Пароль пользователя' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
