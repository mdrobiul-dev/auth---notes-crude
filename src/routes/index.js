import express from "express"
import authRoutes from "./auth.route.js"
import userRoutes from "./user.routes.js"
import adminRoutes from "./admin.routes.js"
import noteRoutes from "./note.route.js"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/admin", adminRoutes)
router.use("/notes", noteRoutes)

export default router                  