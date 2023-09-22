import bcrypt from "bcrypt";
import joi from "joi";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken"


const createToken = (_id) => {
 return jwt.sign({_id},"ABEBEBESOBELA",{expiresIn: "3d"})
}

export const registration = async (req, res) => {
  const data = req.body;

  const schema = joi.object({
    type: joi.string().valid("student", "teacher", "registrar").required(),
    full_name: joi.string().required(),
    gender: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    password: joi.string().min(4).alphanum().required(),
    //program: joi.string().valid("regular", "extension"),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    res.status(400).json(error);
  } else {
    bcrypt.hash(data.password, 10, (err, hash) => {
      if (err) res.status(500).json(err);
      else {
        data.password = hash;

        const user = new User(data);

        const token = createToken(user._id);
        
        user
          .save()
          .then((result) =>{ 
          const response = { token, type: result.type };
           res.status(200).json(response)})
          .catch((error) => res.status(500).json(error));

      }
    });
  }
};

export const registrationStudent = async (req, res) => {
  const data = req.body;
  const file = req.file;

  const schema = joi.object({
    type: joi.string().valid("student", "teacher", "registrar").required(),
    full_name: joi.string().required(),
    gender: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    password: joi.string().min(4).alphanum(),
    program: joi.string().valid("regular", "extension"),
    //file_url: joi.string(),
    dateofbirth:joi.string().required(),
    Residentioaladdress:joi.string().required(),
    startingmonth:joi.string().required(),
    endingmonth:joi.string().required(),

    // file_url: joi.string().required(),
  });

  //if (file) data.file_url = file.path;

  const { error, value } = schema.validate(data);

  //   if (error) {
  //   res.status(400).json(error);
  // } else {
  // const user = new User(data);

  // user
  //   .save()
  //   .then((result) => res.status(200).json({result}))
  //   .catch((error) => res.status(500).json(error));
  // }
  if (error) {
    res.status(400).json(error);
  } else {
    bcrypt.hash(data.password, 10, (err, hash) => {
      if (err) res.status(500).json(err);
      else {
        data.password = hash;

  const user = new User(data);

  user
    .save()
    .then((result) => res.status(200).json({result}))
    .catch((error) => res.status(500).json(error));

      }
    });
  }
};

export const findAll = async (req, res) => {
  const query = req.query;

  User.find(query)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
};

export const findOne = async (req, res) => {
  const _id = req.params.id;

  User.findOne({ _id })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
};

export const update = async (req, res) => {
  const data = req.body;
  const _id = req.params.id;

  const schema = joi.object({
    //type: joi.string().valid("student", "teacher", "registrar"),
    full_name: joi.string(),
    gender: joi.string(),
    email: joi.string(),
    phone: joi.string(),
    program: joi.string().valid("regular", "extension",null),
    dateofbirth:joi.string().required(),
    Residentioaladdress:joi.string().required(),
    startingmonth:joi.string().required(),
    endingmonth:joi.string().required(),
    grade:joi.string()
  });

  const { error, value } = schema.validate(data);

  if (error) {
    res.status(400).json(error);
  } else {
    User.updateOne({ _id }, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  }
};

export const remove = async (req, res) => {
  const _id = req.params.id;

  User.deleteOne({ _id })
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
};

export const login = async (req, res) => {
  const data = req.body;

  const schema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    res.status(400).json(error);
  } else {
    User.findOne({ email: data.email })
      .then((user) => {
        if (user === null) {
          res.status(401).json("Unauthorized");
        } else {
          bcrypt.compare(data.password, user.password, (err, hashResult) => {
            if (err) res.status(401).json("Unauthorized");
            else if (hashResult) {
              const output = user.toJSON();
              const type = output.type;
              delete output.password;
              const token = createToken(user._id)

              res.status(200).json({token,type});
            } else res.status(401).json("Unauthorized");
          });
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

export const addCourse = async (req, res) => {
  const data = req.body;
  const _id = req.params.id;

  const schema = joi.object({
    course_id: joi.string().required(),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    res.status(400).json(error);
  } else {
    User.findOne({ _id })
      .then((user) => {
        if (user) {
          if (user.course_ids.includes(data.course_id)) {
            res.status(400).json("User already has course");
          } else {
            user.course_ids.push(data.course_id);

            user
              .save()
              .then((result) => res.status(200).json(result))
              .catch((error) => res.status(500).json(error));
          }
        } else {
          res.status(404).json("User Not Found");
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

export const addAttendance = async (req, res) => {
  const data = req.body;
  const _id = req.params.id;

  const schema = joi.object({
    date: joi.date().required(),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    res.status(400).json(error);
  } else {
    User.findOne({ _id })
      .then((user) => {
        if (user) {
          user.attended_dates.push(data.date);

          user
            .save()
            .then((result) => res.status(200).json(result))
            .catch((error) => res.status(500).json(error));
        } else {
          res.status(404).json("User Not Found");
        }
      })
      .catch((error) => res.status(500).json(error));
  }
};

export const pullone = async (req, res) => {
  try {
    //const { grade } = req.body;

    const studentid = req.params.studentid;
    const courseid = req.params.courseid;

    User.updateOne({ _id: studentid },{ $pull: { course_ids: courseid } })
      .then((result) => {
        res.status(200).json(result);
      })
  }catch (error) {
  console.error(error);
  return res.status(500).json({message: 'Failed to delete Course' });
}

};
