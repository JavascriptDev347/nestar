import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import {
  MemberAuthType,
  MemberStatus,
  MemberType,
} from '../../enums/member.enum';
import { Direction } from '../../enums/common.enum';
import { availabeAgentSorts, availableMemberSorts } from '../../config';


@InputType() //GraphQL input type yaratadi
export class MemberInput {
  // memberNick
  @IsNotEmpty()
  @Length(3, 12)
  @Field(() => String) //GraphQL schema’da field sifatida ko‘rinad
  memberNick:string;

  @IsNotEmpty()
  @Length(3, 12)
  @Field(() => String)
  memberPassword: string;

  @IsNotEmpty()
  @Field(() => String)
  memberPhone:string;


  @IsOptional()
  @Field(()=>MemberType,{nullable:true})
  memberType?: string;

  @IsOptional()
  @Field(()=>MemberAuthType,{nullable:true})
  memberAuthType?: string;
}

@InputType()
export class LoginInput{
  // memberNick
  @IsNotEmpty() // checks input data is empty or not
  @Length(3, 12) // checks member nick be at least 3 and 12 range
  @Field(() => String)
  memberNick: string;

  // memberPassword
  @IsNotEmpty()
  @Length(3, 12)
  @Field(() => String)
  memberPassword: string;
}

@InputType()
export class AISearch {
  @IsOptional()
  @Field(() => String,{nullable:true})
  text?: string;
}

// pagination logic
@InputType()
export class AgentsInquiry {
  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  page:number;

  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  limit:number;

  @IsOptional()
  @IsIn(availabeAgentSorts)
  @Field(()=>String,{nullable:true})
  sort?:string;

  @IsOptional()
  @Field(()=>Direction,{nullable:true})
  direction?:Direction;

  @IsNotEmpty()
  @Field(() => AISearch)
  search:AISearch;

}

@InputType()
export class MISearch {
  @IsOptional()
  @Field(() => MemberStatus,{nullable:true})
  memberStatus?: MemberStatus;

  @IsOptional()
  @Field(() => MemberType,{nullable:true})
  memberType?: MemberType;

  @IsOptional()
  @Field(() => String,{nullable:true})
  text?: string;
}

@InputType()
export class MembersInquiry {
  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  page: number;

  @IsNotEmpty()
  @Min(1)
  @Field(() => Int)
  limit: number;

  @IsOptional()
  @IsIn(availableMemberSorts)
  @Field(() => String, { nullable: true })
  sort?: string;

  @IsOptional()
  @Field(() => Direction, { nullable: true })
  direction?: Direction;

  @IsNotEmpty()
  @Field(() => MISearch)
  search: MISearch;
}