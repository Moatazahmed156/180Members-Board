const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

const sql = mysql.createPool({
  host: "localhost",
  connectionLimit: 10,
  user: "root",
  password: "",
  database: "180daraga",
});

app.get("/members", (req, res) => {
  const { committee } = req.query;

  let query = "SELECT * FROM members";
  const params = [];

  if (committee) {
    query += " WHERE Committee = ?";
    params.push(committee);
  }

  query += " ORDER BY Score DESC";

  sql.query(query, params, (err, result) => {
    if (err) {
      console.log("Error: ", err);
      return res.status(500).json({ message: "Server Failed" });
    }
    res.status(200).json([{ members: result.length }, result]);
  });
});

app.get("/members/:id", (req, res) => {
  const { id } = req.params;
  sql.query("SELECT * FROM members WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("Error: ", err);
      return res.status(500).json({ message: "Server Failed" });
    }
    res.status(200).json(result);
  });
});

app.post("/members", (req, res) => {
  const { Name, Committee, Score } = req.body;
  sql.query(
    "INSERT into members (Name, Committee , Score) VALUES(? , ? , ?)",
    [Name, Committee, Score],
    (err, result) => {
      if (err) {
        console.log("Error: ", err);
        return res.status(500).json({ message: "Server Failed" });
      }
      res.status(201).json(result);
    }
  );
});

app.patch("/members/:id", (req, res) => {
  const { id } = req.params;
  const { Score } = req.body;
  sql.query(
    "UPDATE members SET Score = ? WHERE id = ?",
    [Score, id],
    (err, result) => {
      if (err) {
        console.log("Error: ", err);
        return res.status(500).json({ message: "Server Failed" });
      }
      res.status(200).json(result);
    }
  );
});

app.delete("/members/:id", (req, res) => {
  const { id } = req.params;
  sql.query("DELETE FROM members WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("Error: ", err);
      return res.status(500).json({ message: "Server Failed" });
    }
    res
      .status(200)
      .json({ message: `Member with ID = ${id} deleted successfully` });
  });
});
app.listen(3000, "0.0.0.0", () => console.log("Running on port 3000"));
