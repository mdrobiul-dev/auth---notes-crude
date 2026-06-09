import express from "express"
import * as noteController from "../controllers/note.controller.js"
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../validators/validator.js";
import { createNoteSchema, updateNoteSchema } from "../validators/note.validator.js";

const router = express.Router()

router.use(protect)

router.post("/", validate(createNoteSchema), noteController.createNote)
router.get("/", noteController.getNotes)
router.get("/:id", noteController.getNoteById)
router.patch("/:id", validate(updateNoteSchema), noteController.updateNote)
router.delete("/:id", noteController.deleteNote)

export default router