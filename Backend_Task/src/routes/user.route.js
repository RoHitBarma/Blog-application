import {Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js"


const router = Router()

// console.log("🟢 Imported registerUser:", typeof registerUser);
// console.log("🟢 registerUser value:", registerUser);

router.route("/register").post(
    upload.fields([
        {
            name: "profilePic",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(logoutUser)


export default router;