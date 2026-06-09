import AppError from "../errors/AppError.js";
import Note from "../models/note.model.js";

export const createNote = async (noteData, userId) => {
  const note = await Note.create({ ...noteData, user: userId });
  return note;
};

export const getUserNotes = async (userId) => {
  const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
  return notes;
};

export const getNoteById = async (noteId, userId) => {
  const note = await Note.findOne({ _id: noteId, user: userId });
  if (!note) throw new AppError("Note not found or access denied", 404);
  return note;
};

export const updateNote = async (noteId, userId, updatedData) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    updatedData,
    { new: true, runValidators: true },
  );
  if (!note) throw new AppError("Note not found or access denied");
  return note
};

export const deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user: userId });
  if (!note) throw new AppError("Note not found or access denied");
};
