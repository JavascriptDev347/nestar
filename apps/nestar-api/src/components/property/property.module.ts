import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PropertySchema from '../../schemas/Property.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';
import { ViewModule } from '../view/view.module';

@Module({
  imports: [MongooseModule.forFeature([{name:"Property", schema: PropertySchema}]),
  AuthModule,MemberModule,ViewModule],

  providers: [PropertyService,PropertyResolver],
})
export class PropertyModule {}
