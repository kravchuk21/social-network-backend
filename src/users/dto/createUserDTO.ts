import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDTO {
  @ApiProperty({
    example: 'Vladislav Kravchuk',
    description: 'Имя пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'test@gmail.com', description: 'Почта пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123456qwerty', description: 'Пароль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  @IsNotEmpty()
  readonly password: string;
}
