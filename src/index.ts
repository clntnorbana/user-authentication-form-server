import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectMongoDb from "./config/database";
import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoute";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/authentication", authRoutes);
app.use("/api/user", userRoutes);

connectMongoDb();
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
