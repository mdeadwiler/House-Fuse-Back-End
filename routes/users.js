import { router } from "express";
import * as controllers from "../controllers/usersController";



router.post("/signup", controllers.signup);

router.post("/signin", controllers.signin);

export default router;