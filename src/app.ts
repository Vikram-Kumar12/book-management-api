import express from "express";
import morgan from "morgan";
import bookRoutes from "./routes/book.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));

app.use("/api", bookRoutes);
app.use(errorHandler);

export default app;
