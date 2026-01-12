import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PropertySchema from '../../schemas/Property.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';

@Module({
  imports: [MongooseModule.forFeature([{name:"Property", schema: PropertySchema}]),
  AuthModule,MemberModule],

  providers: [PropertyService,PropertyResolver],
})
export class PropertyModule {}
