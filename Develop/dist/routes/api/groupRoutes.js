import { Router } from "express";
const router = Router();
import { getAllGroups, getGroupById, createGroup, updateGroup, deleteGroup, } from "../../controllers/groupController.js";
// /api/Groups
router.route("/").get(getAllGroups).post(createGroup);
// /api/Groups/:GroupId
router
    .route("/:GroupId")
    .get(getGroupById)
    .put(updateGroup)
    .delete(deleteGroup);
export { router as groupRouter };
