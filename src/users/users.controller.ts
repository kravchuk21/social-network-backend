import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDTO } from './dto/createUserDTO';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
}
