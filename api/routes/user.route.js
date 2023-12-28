import Express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { varifyToken } from "../utils/varifyUser.js";

const router = Express.Router();

router.get("/", test);
router.post("/update/:id", varifyToken, updateUser);
router.delete("/delete/:id", varifyToken, deleteUser);

export default router;
