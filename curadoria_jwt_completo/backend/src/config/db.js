const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || 'db.uftqlfelzaridqncuwzu.supabase.co',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Maio1996()()())',
  database: process.env.DB_NAME || 'att',
  port: process.env.DB_PORT || 5432
});

module.exports = pool;
