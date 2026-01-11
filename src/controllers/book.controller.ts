import { Request, Response } from "express";
import BookModel from "../models/book.model";
import { parseCSV } from "../utils/csvParser";

// GET -> Get list of all books
const getBooks = async (req: Request, res: Response) => {
  const books = await BookModel.find();
  res.status(200).json({
    books,
  });
};

// GET -> Get books by id
const getBookById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Book ID is required" });
  }
  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json({
    book,
  });
};

// POST -> add a new book
const addBook = async (req: Request, res: Response) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const book = await BookModel.create({
    title,
    author,
    publishedYear,
  });

  res.status(201).json({
    book,
  });
};

// PUT -> update an existing book
const updateBook = async (req: Request, res: Response) => {
  const { title, author, publishedYear } = req.body;
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Book ID is required" });
  }
  const book = await BookModel.findByIdAndUpdate(
    id,
    { title, author, publishedYear },
    { new: true }
  );

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json({
    book,
  });
};

// DELETE -> delete a book by its id
const deleteBook = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Book ID is required" });
  }
  const book = await BookModel.findByIdAndDelete(id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(200).json({ message: "Book deleted successfully" });
};

// POST -> import books from CSV file
const importBooks = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "CSV file is required" });
  }
  const content = req.file.buffer.toString("utf-8");
  const { validBooks, errors } = parseCSV(content);

  if (validBooks.length > 0) {
    await BookModel.insertMany(validBooks);
  }

  res.status(200).json({
    addedBooks: validBooks.length,
    errors,
  });
};

export { getBooks, getBookById, addBook, updateBook, deleteBook, importBooks };