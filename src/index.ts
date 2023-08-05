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
app.set("trust proxy", true);
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   const allowedOrigins = [
//     "http://localhost:5173",
//     "https://user-authentication-server.onrender.com",
//     "https://user-authentication-kappa.vercel.app",
//     // here
//   ];
//   const origin = req.headers.origin as OrientationType;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-credentials", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//   next();
// })

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.header("Origin") || "*");
  res.removeHeader("x-powered-by");
  res.setHeader("Access-Control-Allow-Origin", req.method);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// routes
app.use("/api/authentication", authRoutes);
app.use("/api/user", userRoutes);

connectMongoDb();
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
