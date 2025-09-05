const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Export a query function to be used throughout the app
module.exports = {
  query: (text, params) => pool.query(text, params),
};
