import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    //required: true,
  },
  type: {
    type: String,
    //required: true,
    enum: ["regular", "extension"],
  },
});

export default courseSchema;

export const Course = mongoose.model("Course", courseSchema);
