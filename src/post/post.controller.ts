import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { createPostDTO } from './dto/createPostDTO';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/currentUser.decorator';
import { User } from '../users/schemas/user.schema';
import { AuthService } from '../auth/auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostSchema } from './schemas/postSchemas';

@ApiTags('posts')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: PostSchema })
  @ApiBody({ type: [createPostDTO] })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@CurrentUser() user: User, @Body() dto: createPostDTO) {
    return await this.postService.create(dto, user.id);
  }
}
