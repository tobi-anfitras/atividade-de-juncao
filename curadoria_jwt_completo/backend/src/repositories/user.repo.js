const db = require("../config/db");

async function findByEmail(email) {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows[0];
}

async function createUser(name, email, password_hash) {
  const { rows } = await db.query(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
    [name, email, password_hash]
  );
  return rows[0].id;
}

async function findById(id) {
  const { rows } = await db.query("SELECT id, name, email FROM users WHERE id = $1", [id]);
  return rows[0];
}

module.exports = { findByEmail, createUser, findById };
