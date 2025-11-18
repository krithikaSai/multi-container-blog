import express from "express";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = process.env.JWT_SECRET;

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "blogdb"
});

// Ensure users table exists
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  );
`);

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashed],
    err => {
      if (err) return res.status(500).json({ message: "Username already exists" });
      res.json({ message: "User registered successfully" });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, rows) => {
      if (err || rows.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = rows[0];

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ message: "Invalid credentials" });
 
      console.log("LOGIN: using SECRET =", SECRET);
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "1h" });
      console.log("TOKEN ISSUED:", token);

      res.json({ message: "Login successful", token });
    }
  );
});

export default router;
