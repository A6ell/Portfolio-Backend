import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    //required: true,
  },
  program: {
    type: String,
    default: null,
  },
  file_url: {
    type: String,
    default: null,
  },
  course_ids: {
    type: [Types.ObjectId],
    default: null,
  },
  attended_dates: {
    type: [String],
    enum: ['present', 'absent']
  },
  dateofbirth:{
    type: Date
  },
  Residentioaladdress:{
    type: String
  },
  startingmonth:{
    type: Date
  },
  endingmonth:{
    type: Date
  },
  grade:{
    type:String
  }
});

export const User = mongoose.model("User", userSchema);
