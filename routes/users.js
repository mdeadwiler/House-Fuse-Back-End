import { Router } from "express";
import * as controllers from "../controllers/usersController.js";

const router = Router();

router.post("/signup", controllers.signup);

router.post("/signin", controllers.signin);

export default router;