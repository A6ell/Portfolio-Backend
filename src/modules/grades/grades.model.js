import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  studentid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  grade: { 
    type: String,
    required: true 
},
  courseid: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Course'
},
});

export const Grade = mongoose.model("Grade", gradeSchema);
