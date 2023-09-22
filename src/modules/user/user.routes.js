import { Router } from "express";
import {
  findAll,
  findOne,
  registration,
  update,
  remove,
  login,
  addCourse,
  pullone,
  addAttendance,
  registrationStudent,
} from "./user.controller.js";

import {requireAuth} from "../../middelwear/requireAuth.js"

const router = Router();

router.post("/", registration);

router.post("/login", login);

//router.use(requireAuth);
/**
 * router.post("/register-student", multer.single('file') , registrationStudent);
 */
router.post("/register-student", registrationStudent); //to do add multer like the comment above

router.post("/add-course/:id", addCourse);

router.delete("/delete-course/:studentid/:courseid", pullone);

router.post("/add-attendance/:id", addAttendance);


router.get("/", findAll);

router.get("/:id", findOne);

router.put("/:id",update);

router.delete("/:id",remove);

export default router;
