const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const Config = {
  PORT: process.env.PORT || 5000,
  API_BASE_URL: process.env.API_BASE_URL || `http://localhost:5000`,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = { Config };