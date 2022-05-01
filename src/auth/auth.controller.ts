import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDTO } from '../users/dto/createUserDTO';
import { AuthService } from './auth.service';
import { loginUserDTO } from '../users/dto/loginUserDTO';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';

//TODO: скрывать пароль пользователя

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: [loginUserDTO] })
  @ApiResponse({ status: 200, description: 'token' })
  login(@Body() dto: loginUserDTO) {
    return this.authService.login(dto);
  }

  @Post('/registration')
  @ApiOperation({ summary: 'Регистрация' })
  @ApiBody({ type: [createUserDTO] })
  @ApiResponse({ status: 200, description: 'token' })
  register(@Body() dto: createUserDTO) {
    return this.authService.register(dto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Получение личных данных' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return await this.usersService.findOne(user.id);
  }
}
