import { Router } from "express";
import {
  findAll,
  findOne,
  registration,
  registrationdepartment,
  update,
  remove,
} from "./course.controller.js";

const router = Router();

router.post("/", registration);

router.post("/department", registrationdepartment);

router.get("/", findAll);

router.get("/:id", findOne);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
