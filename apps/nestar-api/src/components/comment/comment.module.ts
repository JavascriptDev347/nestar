import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CommentSchema from '../../schemas/Comment.model';
import { AuthModule } from '../auth/auth.module';
import { PropertyModule } from '../property/property.module';
import { MemberModule } from '../member/member.module';
import { BoardArticleModule } from '../board-article/board-article.module';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:"Comment",
        schema: CommentSchema,
      }
    ]),
    AuthModule,
    MemberModule,
    BoardArticleModule,
    PropertyModule,
  ],
  providers: [CommentResolver,CommentService],
})
export class CommentModule {}