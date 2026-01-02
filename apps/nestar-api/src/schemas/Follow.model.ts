import { Schema, Types } from 'mongoose';

const FollowSchema = new Schema({
  followingId:{
    type:Types.ObjectId,
    required:true,
  },
  followerId:{
    type:Types.ObjectId,
    required:true,
  }
},{timestamps: true});

FollowSchema.index({followingId:1,followerId:1},{unique:true});

export default FollowSchema;