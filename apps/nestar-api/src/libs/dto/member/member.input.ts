import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { MemberAuthType, MemberType } from '../../enums/member.enum';


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