// Use require for CommonJS modules in Node v12
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({
  origin: "http://localhost:3000", // Your React app's origin
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use("/public", express.static(path.join(__dirname, "public")));

// --- Routes ---
app.use("/api", apiRoutes);

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});