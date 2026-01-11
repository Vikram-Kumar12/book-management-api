import dotenv from "dotenv";
import app from "./src/app"
import connectDB from "./src/config/db";

dotenv.config();
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT ,() => console.log(`Server Started at http://localhost:${PORT}`));
}).catch((err)=>{
    console.log("DataBase connection failed!",err);
    process.exit(1);
})