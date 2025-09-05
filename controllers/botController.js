const { processFlow } = require("../services/processFlow.js");

const handleMessage = async (req, res) => {
  try {
    const userId = req.user; // From authenticate middleware
    const { message } = req.body;

    // --- GUARD: Check for required data ---
    if (!message || !userId) {
      return res.status(400).json({ error: "userId and message are required" });
    }

    const reply = await processFlow(userId, message);
    res.json({ response: reply });

  } catch (error) {
    console.error("Bot controller error:", error);
    res.status(500).json({ error: "An error occurred in the bot logic." });
  }
};

module.exports = { handleMessage: handleMessage };