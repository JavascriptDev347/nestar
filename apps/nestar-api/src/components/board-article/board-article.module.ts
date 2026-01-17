import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import BoardArticleSchema from '../../schemas/BoardArticle.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { ViewModule } from '../view/view.module';
import { BoardArticleService } from './board-article.service';
import { BoardArticleResolver } from './board-article.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "BoardArticle", schema: BoardArticleSchema }]),
    AuthModule,
    MemberModule,
    ViewModule
  ],

  providers: [BoardArticleService,BoardArticleResolver],
  exports: [BoardArticleService],

})
export class BoardArticleModule {

}