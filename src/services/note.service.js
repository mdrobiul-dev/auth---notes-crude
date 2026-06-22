import AppError from "../errors/AppError.js";
import Note from "../models/note.model.js";

export const createNote = async (noteData, userId) => {
  const note = await Note.create({ ...noteData, user: userId });
  return note;
};

export const getUserNotes = async (userId, queryParams) => {
  const {
    search,
    sort,
    page = 1,
    limit = 10,
    category,
    isFavorite,
  } = queryParams;

  const filter = { user: userId };

  // 1. Search (title + content)
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  // 2. Filtering
  if (category) {
    filter.category = category.toLowerCase();
  }
  if (isFavorite !== undefined) {
    filter.isFavorite = isFavorite === "true" || isFavorite === true;
  }

  // 3. Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const limitNum = parseInt(limit);

  // 4. Sorting
  let sortOption = { createdAt: -1 }; // default: newest first
  if (sort) {
    const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
    const sortOrder = sort.startsWith("-") ? -1 : 1;
    sortOption = { [sortField]: sortOrder };
  }

  const [notes, totalResults] = await Promise.all([
    Note.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .select("-__v"),
    Note.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalResults / limitNum);

  return {
    notes,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalResults,
      resultsPerPage: limitNum,
      hasNext: parseInt(page) < totalPages,
      hasPrev: parseInt(page) > 1,
    },
  };
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
    { returnDocument: "after", runValidators: true },
  );
  if (!note) throw new AppError("Note not found or access denied");
  return note;
};

export const deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user: userId });
  if (!note) throw new AppError("Note not found or access denied");
};
