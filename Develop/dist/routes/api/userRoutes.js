import { Router } from "express";
const router = Router();
import { getAllUsers, getUserById, createuser, deleteUser, addPost, removePost, } from "../../controllers/userController.js";
// /api/Users
router.route("/").get(getAllUsers).post(createuser);
// /api/Users/:userId
router.route("/:userId").get(getUserById).delete(deleteUser);
// /api/Users/:userId/posts
router.route("/:userId/posts").post(addPost);
// /api/Users/:userId/posts/:postId
router.route("/:userId/posts/:postId").delete(removePost);
export { router as userRouter };
