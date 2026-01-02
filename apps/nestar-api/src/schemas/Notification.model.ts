import { Schema, Types } from 'mongoose';
import {
  NotificationGroup,
  NotificationStatus,
  NotificationType,
} from '../libs/enums/notification.enum';

const NotificationSchema = new Schema({
  notificationType: {
    type: String,
    enum: NotificationType,
    required: true,
  },
  notificationStatus:{
    type: String,
    enum: NotificationStatus,
    default:NotificationStatus.WAIT
  },
  notificationGroup:{
    type: String,
    enum: NotificationGroup,
    required: true,
  },
  notificationTitle: {
    type: String,
    required: true,
  },

  notificationDesc: {
    type: String,
  },

  authorId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Member',
  },
  receiverId:{
    type:Types.ObjectId,
    required: true,
    ref: 'Member',
  },
  propertyId:{
    type: Types.ObjectId,
    ref:"Property",
  },
  articleId:{
    type: Types.ObjectId,
    ref:"BoardArticle",
  }
},{timestamps: true,collection:"notifications"});

export default NotificationSchema;