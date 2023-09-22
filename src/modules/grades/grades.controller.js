import { Grade } from "./grades.model.js";
import  mongoose from 'mongoose';

export const grades = async (req, res) => {
  try {
    const { grade } = req.body;

    const studentid = req.params.studentid;
    const courseid = req.params.courseid;

    if (!mongoose.isValidObjectId(studentid) || !mongoose.isValidObjectId(courseid) ) {
      return res.status(400).json({ message: 'Invalid resource id' });
    }

    const existingGrade = await Grade.findOne({studentid,courseid });

    if (existingGrade) {
      return res.status(400).json({ message: 'A grade for this student and course already exists.' });
    }

    const newGrade = new Grade({studentid,grade,courseid});
    
    newGrade.save()
            .then((result) => res.status(200).json(result))
            .catch((error) => res.status(500).json(error));

  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Failed to register grade' });
  }
};



export const findOne = async (req, res) => {
  try {
    const studentid = req.params.studentid;
    const courseid = req.params.courseid;

    if (!mongoose.isValidObjectId(studentid) || !mongoose.isValidObjectId(courseid) ) {
      return res.status(400).json({ message: 'Invalid resource id' });
    }

    // Find the grade document based on student and course IDs
    const grade = await Grade.findOne({studentid, courseid });

    if (!grade) {
      return res.status(404).json({ message: 'Grade not found' });
    }

    res.json(grade);
  } catch (error) {
    console.error('Failed to fetch grade:', error);
    res.status(500).json({ message: 'Failed to fetch grade' });
  }
};

export const update = async (req, res) => {
  try {
    const { grade } = req.body;

    const studentid = req.params.studentid;
    const courseid = req.params.courseid;

    Grade.updateOne({ studentid, courseid }, { $set: { grade } })
    .then((result) => {res.status(200).json(result);})
  }catch (error) {
  console.error(error);
  return res.status(500).json({message: 'Failed to edit grade' });
}

};

export const deletegrade = async (req, res) => {
  try {

    const studentid = req.params.studentid;
    const courseid = req.params.courseid;

    Grade.deleteOne({ studentid,courseid })
    .then((result) => {res.status(200).json(result);})
  }catch (error) {
  console.error(error);
  return res.status(500).json({message: 'Failed to delete grade' });
}

};