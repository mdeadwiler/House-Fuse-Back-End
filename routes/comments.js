import { Router } from "express";
import authorizedUser from "../middleware/authorized-user.js";
import * as commentControllers from "../controllers/commentController.js";

const router = Router();



router.delete("/:commentId", authorizedUser, commentControllers.deleteComment); // DELETE /api/comments/:commentId => Deletes Comment. [params]
router.put("/:commentId", authorizedUser, commentControllers.updateComment); // PUT /api/comments/:commentId => Updates a Comment. [params, body]

export default router;