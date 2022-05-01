import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    //TODO: добавить mongo uri в .env
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/social-network',
    ),
    AuthModule,
    PostModule,
  ],
})
export class AppModule {}
