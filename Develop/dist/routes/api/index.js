import { Router } from "express";
import { groupRouter } from "./groupRoutes.js";
import { userRouter } from "./userRoutes.js";
const router = Router();
router.use("/groups", groupRouter);
router.use("/users", userRouter);
export default router;
