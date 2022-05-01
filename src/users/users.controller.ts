import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDTO } from './dto/createUserDTO';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  async getUser(@Param() params: { id: string }) {
    return await this.usersService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: [createUserDTO] })
  @Post('/create')
  async create(@Body() dto: createUserDTO) {
    return await this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  async getAll() {
    return await this.usersService.findAll();
  }
}
