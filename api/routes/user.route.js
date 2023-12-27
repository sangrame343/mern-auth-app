import Express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = Express.Router();

router.get("/", test);
router.post("/update/:id", varifyToken, updateUser);
export default router;
