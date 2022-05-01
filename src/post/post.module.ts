import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchemas } from './schemas/postSchemas';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchemas }]),
    forwardRef(() => AuthModule),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
