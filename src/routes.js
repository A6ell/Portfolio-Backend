import { Router } from "express";

import UserRoutes from "./modules/user/user.routes.js";
import CourseRoutes from "./modules/course/course.routes.js";
import gradesRoutes from './modules/grades/grades.routes.js';
import newsRoutes from './modules/news/news.routes.js';


const router = Router();

// router.use(requireAuth)

router.use("/course", CourseRoutes);

router.use("/user", UserRoutes);

//GRADES

router.use("/grades", gradesRoutes);
router.use("/news", newsRoutes);

//const uploadRoute = require('./routes/upload');

//router.use('/upload', upload);

export default router;
