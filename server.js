const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// MySQL接続設定
const connection = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydatabase",
});

// データベース接続
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// 静的ファイルの提供
app.use(express.static("public"));

// データを取得するエンドポイント
app.get("/message", (req, res) => {
  connection.query(
    "SELECT message_text FROM messages LIMIT 1",
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving data");
        return;
      }
      res.json(results[0]);
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
