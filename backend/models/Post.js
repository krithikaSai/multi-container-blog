import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "db",
  user: "root",
  password: "password",
  database: "blogdb"
});

// Table creation (only once)
await db.execute(`
  CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    content TEXT,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
