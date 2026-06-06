import express from "express"
import { protect } from "../middleware/auth.middleware.js";
import  { updateUserProfile, getMe } from "../controllers/user.controller.js"
import { updateProfileSchema } from "../validators/auth.validator.js";
import { validate } from "../validators/validator.js";

const router = express.Router()

router.use(protect)

router.get("/me", getMe )
router.put("/me", validate(updateProfileSchema), updateUserProfile)

export default router


