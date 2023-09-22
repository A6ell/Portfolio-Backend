import joi from "joi";
import { Course } from "./course.model.js";
import { Types } from "mongoose";

export const registration = async (req, res) => {
  const data = req.body;

  const schema = joi.object({
    type: joi.string().valid("regular", "extension").required(),
    department: joi.string().required(),
    name: joi.string().required(),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    res.status(400).json(error);
  } else {
    const course = new Course(data);

    course
      .save()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  }
};

export const registrationdepartment = async (req, res) => {
  const data = req.body;

  const schema = joi.object({
    department: joi.string().required(),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    res.status(400).json(error);
  } else {
    const course = new Course(data);

    course
      .save()
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  }
};

export const findAll = async (req, res) => {
  const query = req.query;

  if (query.ids) {
    const ids = query.ids.split(",");
    delete query.ids;

    query._id = {
      $in: ids,
    };

    delete query.ids;
  }

  Course.find(query)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
};

export const findOne = async (req, res) => {
  const _id = req.params.id;

  Course.findOne({ _id })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
};

export const update = async (req, res) => {
  const data = req.body;
  const _id = req.params.id;

  const schema = joi.object({
    // type: joi.string().valid("regular", "extension"),
    // department: joi.string(),
    name: joi.string(),
  });

  const { error, value } = schema.validate(data);

  if (error) {
    res.status(400).json(error);
  } else {
    Course.updateOne({ _id }, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(500).json(error));
  }
};

export const remove = async (req, res) => {
  const _id = req.params.id;

  Course.deleteOne({ _id })
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(500).json(error));
};
