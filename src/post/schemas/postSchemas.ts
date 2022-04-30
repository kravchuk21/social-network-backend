import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @ApiProperty({
    example: 'a676123hiafo231',
    description: 'Уникальный идинтификатор',
  })
  @Transform(({ value }) => value.toString())
  id: string;

  @Prop()
  @ApiProperty({ example: 'Vladislav Kravchuk', description: 'Текст поста' })
  text: string;

  @ApiProperty({ example: 'k123kkash1323', description: 'ID создателя поста' })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Type(() => Types.ObjectId)
  author: Types.ObjectId;
}

export const PostSchemas = SchemaFactory.createForClass(Post);
