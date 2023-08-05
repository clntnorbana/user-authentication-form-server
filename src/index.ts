import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectMongoDb from "./config/database";
import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoute";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://user-authentication-kappa.vercel.app",
    credentials: true,
  })
);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });
app.use(cookieParser());

// routes
app.use("/api/authentication", authRoutes);
app.use("/api/user", userRoutes);

connectMongoDb();
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
