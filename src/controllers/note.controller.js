import * as noteService from "../services/note.service.js";
import { successResponse } from "../utils/apiResponse.js";
import catchAsync from "../utils/catchAsync.js";

export const createNote = catchAsync(async (req, res, next) => {
  const note = await noteService.createNote(req.body, req.user._id);

  successResponse(res, "Note Created succesfully", note, 201);
});

export const getNotes = catchAsync(async (req, res, next) => {
  const notes = await noteService.getUserNotes(req.user._id);

  successResponse(res, "Note fetched succesfully", notes, 200);
});

export const getNoteById = catchAsync(async (req, res, next) => {
  const note = await noteService.getNoteById(req.params.id, req.user._id);

  successResponse(res, "Note fetched succesfully", note, 200);
});

export const updateNote = catchAsync(async (req, res, next) => {
  const note = await noteService.updateNote(
    req.params.id,
    req.user._id,
    req.body,
  );

  successResponse(res, "Note updated succesfully", note, 200);
});

export const deleteNote = catchAsync(async (req, res, next) => {
  await noteService.deleteNote(req.params.id, req.user._id);

  successResponse(res, "Note deleted succesfully", null, 200);
});
