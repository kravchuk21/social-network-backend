import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { createPostDTO } from './dto/createPostDTO';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { User } from '../users/schemas/user.schema';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostSchema } from './schemas/postSchemas';

@ApiTags('posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: PostSchema })
  @ApiBody({ type: [createPostDTO] })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@CurrentUser() user: User, @Body() dto: createPostDTO) {
    return await this.postService.create(dto, user.id);
  }

  @ApiOperation({ summary: 'Получение всех постов' })
  @ApiResponse({ status: 200, type: [PostSchema] })
  @Get()
  async getAll() {
    return await this.postService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение поста по id' })
  @ApiResponse({ status: 200, type: PostSchema })
  async getPost(@Param() { id }) {
    return await this.postService.findOne(id);
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'Получение всех постов пользователя' })
  @ApiResponse({ status: 200, type: [PostSchema] })
  async getAllUserPosts(@Param() { id }) {
    return await this.postService.getPostsByUser(id);
  }
}
