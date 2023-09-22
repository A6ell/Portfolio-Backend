import { Router } from "express";

import {grades,findOne,update,deletegrade} from "./grades.controller.js";

const router = Router();

router.post('/:studentid/:courseid',grades);

router.get('/:studentid/:courseid',findOne);

router.put('/:studentid/:courseid',update);

router.delete('/:studentid/:courseid',deletegrade);

export default router;