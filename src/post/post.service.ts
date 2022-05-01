import { Injectable } from '@nestjs/common';
import { createPostDTO } from './dto/createPostDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/postSchemas';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(dto: createPostDTO, id: string): Promise<Post> {
    const createdPost = new this.postModel({ ...dto, author: id });
    await createdPost.save();
    return createdPost.populate('author');
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().populate('author').exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findOne({ _id: id }).populate('author').exec();
  }

  async getPostsByUser(userId): Promise<User[]> {
    return this.postModel.find({ author: userId }).populate('author');
  }
}
