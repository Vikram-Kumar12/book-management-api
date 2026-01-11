import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim:true,
    },
    author: {
      type: String,
      required: true,
      trim:true,
    },
    publishedYear: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const BookModel = mongoose.model("BookModel", bookSchema);
export default BookModel;
