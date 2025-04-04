import express from "express";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import userProjectRoute from "./routes/userProjectRoute.js";
import userContactRoute from "./routes/userContactRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./db/connectToDB.js";

dotenv.config();

 const app = express();
const PORT = process.env.PORT || 5000;
await connectToDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/project", userProjectRoute);
app.use("/api/contact", userContactRoute);

app.listen(PORT, () => {
  console.log("listening on prot:", PORT);
});
