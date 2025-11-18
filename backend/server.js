import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";

const app = express();
const port = 8080;

// enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ========================
   ROUTES
========================= */

// /posts router handles its own auth logic (verifyToken inside posts.js)
app.use("/posts", postsRouter);

// Authentication routes
app.use("/auth", authRouter);

// health check
app.get("/", (req, res) => {
  res.send("Backend running fine");
});

/* ========================
   START SERVER
========================= */
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
