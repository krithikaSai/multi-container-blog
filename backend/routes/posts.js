import express from "express";
import db from "../models/Post.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

// Fix dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ========================
   MULTER (image upload)
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/* ========================
   AUTH MIDDLEWARE
========================= */
function verifyToken(req, res, next) {
  const header = req.headers["authorization"];

  console.log("VERIFY: Header =", header);
  console.log("VERIFY: using SECRET =", SECRET);

  if (!header) return res.status(403).send("Token required");

  const token = header.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT VERIFY ERROR:", err);
      return res.status(401).send("Invalid token");
    }

    req.user = decoded;
    next();
  });
}

/* ========================
   ROUTES
========================= */

// ✅ PUBLIC READ ALL POSTS
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM posts ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PROTECTED CREATE POST (supports images)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    await db.execute(
      "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)",
      [title, content, imagePath]
    );
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PROTECTED UPDATE POST (JSON only)
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const [result] = await db.execute(
      "UPDATE posts SET title = ?, content = ? WHERE id = ?",
      [title, content, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Post not found" });

    const [updated] = await db.execute("SELECT * FROM posts WHERE id = ?", [id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PROTECTED DELETE POST
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM posts WHERE id = ?", [id]);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
