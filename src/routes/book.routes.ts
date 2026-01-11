import express from "express";
import { addBook, deleteBook, getBookById, getBooks, importBooks, updateBook } from "../controllers/book.controller";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();

router.get("/books", getBooks);
router.post("/books", addBook);
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);
router.post("/books/import", upload.single("file"), importBooks);

export default router;
