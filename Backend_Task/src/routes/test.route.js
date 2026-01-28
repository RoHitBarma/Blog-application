import { Router } from "express";
import { testRegister } from "../controllers/test.controller.js";

const router = Router();
router.route("/test").post(testRegister);
export default router;