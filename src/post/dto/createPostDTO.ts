import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createPostDTO {
  @ApiProperty({ example: 'Hello, world!', description: 'Текст сообщения' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty()
  readonly text: string;
}
