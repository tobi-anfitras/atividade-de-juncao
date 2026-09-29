const { Pool } = require("pg");
const pool = new Pool({
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    user: 'postgres.qnnuaexufashuawkbfdj',
    password: 'nNtWqg2uLRY6W3Xe',
    database: 'postgres',
    port:6543
  });
  
  module.exports = pool;