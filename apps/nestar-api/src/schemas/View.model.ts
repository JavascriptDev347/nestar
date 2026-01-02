import { Schema, Types } from 'mongoose';
import { ViewGroup } from '../libs/enums/view.enum';

const ViewSchema = new Schema({
  viewGroup:{
    type:String,
    enum:ViewGroup,
    required:true
  },
  viewRefId:{
    type:Types.ObjectId,
    required:true
  },
  memberId:{
    type:Types.ObjectId,
    required:true,
    ref:"Member",
  }
},{timestamps:true,collection:"views"});
ViewSchema.index({viewRefId:1,memberId:1},{unique:true});
export default ViewSchema;