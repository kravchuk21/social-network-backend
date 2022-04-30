import { Injectable } from '@nestjs/common';
import { createPostDTO } from './dto/createPostDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/postSchemas';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(dto: createPostDTO, id: string): Promise<Post> {
    const createdPost = new this.postModel({ ...dto, author: id });
    await createdPost.save();
    return createdPost.populate('author');
  }
}
