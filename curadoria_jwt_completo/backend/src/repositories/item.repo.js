const db = require("../config/db");

async function list(userId) {
  const { rows } = await db.query(
    "SELECT * FROM curation_items WHERE user_id = $1",
    [userId]
  );
  return rows;
}

async function create(userId, data) {
  const { title, url, notes, tags } = data;
  const { rows } = await db.query(
    "INSERT INTO curation_items (user_id, title, url, notes, tags) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [userId, title, url || null, notes || null, tags || null]
  );
  return rows[0].id;
}

module.exports = { list, create };
