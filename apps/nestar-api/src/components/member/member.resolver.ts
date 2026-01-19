import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import {
  AgentsInquiry,
  LoginInput,
  MemberInput,
  MembersInquiry,
} from '../../libs/dto/member/member.input';
import { Member, Members } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { RolesGuard } from "../auth/guards/roles.guard";
import { MemberType } from "../../libs/enums/member.enum";
import { Roles } from "../auth/decorators/roles.decorator";
import { MemberUpdate } from "../../libs/dto/member/member.update";
import { ObjectId } from "mongoose";
import {
  getSerialForImage,
  shapeIntoMongoObjectId,
  validMimeTypes,
} from '../../libs/config';
import { WithoutGuard } from "../auth/guards/without.guard";
import {GraphQLUpload, FileUpload } from 'graphql-upload';
import { Message } from '../../libs/enums/common.enum';
import { createWriteStream } from 'fs';

@Resolver()
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}
  // Query = GET(RestApi)
  // Mutation = POST(RestApi)

  @Mutation(() => Member) // return type Member DTO
  public async signup(@Args('input') input: MemberInput): Promise<Member> {
      console.log('signup input:', input);
      return await this.memberService.signup(input);
  }

  @Mutation(() => Member)
  public async login(@Args('input') input: LoginInput): Promise<Member> {
      console.log('login input:', input);
      return await this.memberService.login(input);
  }

  // Authenticated users (USER, ADMIN, AGENT)
  @UseGuards(AuthGuard) // AuthGuard ni chaqirib ishlatish
  @Mutation(() => Member)
  public async updateMember(
    @Args("input") input:MemberUpdate,
    @AuthMember("_id") memberId: ObjectId,
  ): Promise<Member> {
    console.log('mutation: updateMember');
    console.log('memberId:', memberId);
    delete input._id;
    return await this.memberService.updateMember(memberId,input);
  }

  @UseGuards(AuthGuard) // AuthGuard ni chaqirib ishlatish
  @Query(() => String)
  public async checkAuth(@AuthMember('memberNick') memberNick: string): Promise<string> {
    console.log('mutation: checkAuth');
    console.log("memberNick:", memberNick);
    return `Hi ${memberNick}`;
  }

  @Roles(MemberType.USER, MemberType.AGENT)
  @UseGuards(RolesGuard)
  @Query(() => String)
  public async checkAuthRoles(@AuthMember() authMember:Member ):Promise<string> {
    console.log('query: checkAuthRoles');
    return `Hi ${authMember.memberNick}, you are ${authMember.memberType} (memberId: ${authMember._id})`;
  }

  @UseGuards(WithoutGuard)
  @Query(() => Member)
  public async getMember(
    @Args('memberId') input:string,
    @AuthMember("_id") memberId:ObjectId,
  ): Promise<Member> {
    console.log('query: getMember');
    console.log("memberId:", memberId);
    const targetId = shapeIntoMongoObjectId(input)
    return await this.memberService.getMember(memberId, targetId);
  }

  /** LIKE LOGIC **/
  @UseGuards(AuthGuard)
  @Mutation(() => Member)
  public async likeTargetMember(
    @Args('memberId') input: string, // like bosilgan member
    @AuthMember('_id') memberId: ObjectId, // like bosadigan member
  ): Promise<Member> {
    console.log('mutation: likeTargetMember');
    const likeRefIf = shapeIntoMongoObjectId(input);
    return await this.memberService.likeTargetMember(memberId, likeRefIf);
  }

  /** ADMIN **/
  // Authorization: ADMIN
  @Roles(MemberType.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Members)
  public async getAllMembersByAdmin(
    @Args('input') input:MembersInquiry
  ): Promise<Members> {
    console.log('mutation: getAllMembersByAdmin');
    return await this.memberService.getAllMembersByAdmin(input);
  }

  // Authorization: ADMIN
  @Roles(MemberType.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Member)
  public async updateMemberByAdmin(@Args('input') input:MemberUpdate): Promise<Member> {
    console.log('mutation: updateMemberByAdmin');
    return await this.memberService.updateMemberByAdmin(input);
  }



  @UseGuards(WithoutGuard)
  @Query(() => Members)
  public async getAgents(@Args('input') input: AgentsInquiry, @AuthMember("_id") memberId: ObjectId): Promise<Members> {
    console.log("Query GetAgents")
    return await this.memberService.getAgents(memberId, input);
  }


  /** UPLOADER **/
  @UseGuards(AuthGuard)
  @Mutation((returns) => String)
  public async imageUploader(
    @Args({name:'file', type:()=>GraphQLUpload})
    {createReadStream,mimetype,filename}:FileUpload,
    @Args('target') target:String
  ):Promise<string> {
    console.log('Mutation: imageUploader');
    if (!filename) throw new Error(Message.UPLOAD_FAILED);
    const validMime = validMimeTypes.includes(mimetype);
    if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);
    const imageName = getSerialForImage(filename);
    const url = `uploads/${target}/${imageName}`;
    const stream = createReadStream();
    console.log("ff",imageName);
    const result = await new Promise((resolve, reject) => {
      stream
        .pipe(createWriteStream(url))
        .on('finish', async () => resolve(true))
        .on('error', () => reject(false));
    });
    if (!result) throw new Error(Message.UPLOAD_FAILED);
    return url;
  }


//   multiple image upload

  @UseGuards(AuthGuard)
  @Mutation((returns) => [String])
  public async imagesUploader(
    @Args('files',{type:()=>[GraphQLUpload]}) files:Promise<FileUpload>[],
    @Args('target')target:String
  ):Promise<string[]> {
    console.log('Mutation: imagesUploader');
    const uploadedImages= [];
    const promisedList = files.map(async (img: Promise<FileUpload>, index: number): Promise<Promise<void>> => {
      try {
        const { filename, mimetype, encoding, createReadStream } = await img;

        const validMime = validMimeTypes.includes(mimetype);
        if (!validMime) throw new Error(Message.PROVIDE_ALLOWED_FORMAT);

        const imageName = getSerialForImage(filename);
        const url = `uploads/${target}/${imageName}`;
        const stream = createReadStream();

        const result = await new Promise((resolve, reject) => {
          stream
            .pipe(createWriteStream(url))
            .on('finish', () => resolve(true))
            .on('error', () => reject(false));
        });
        if (!result) throw new Error(Message.UPLOAD_FAILED);

        uploadedImages[index] = url;
      } catch (err) {
        console.log('Error, file missing!');
      }
    });

    await Promise.all(promisedList);
    return uploadedImages;
  }
}



