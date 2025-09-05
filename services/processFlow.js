const db = require("../config/db");
const { flow } = require("./flow.js");

const API_BASE_URL = process.env.API_BASE_URL;

const processFlow = async (userId, message) => {
  const trackingResult = await db.query('SELECT * FROM "tracking" WHERE "userId" = $1', [Number(userId)]);
  if (trackingResult.rows.length === 0) {
    throw new Error("User tracking data not found");
  }
  const tracking = trackingResult.rows[0];

  const currentStepKey = tracking.currentStep;
  const step = flow[currentStepKey];
  if (!step) {
    throw new Error("Chatbot flow step not found");
  }

  let botResponse = {};
  let newStepKey = currentStepKey;
  const userMessage = message.toLowerCase().trim();

  // Logic to advance the flow. It now only depends on "next" or similar triggers.
  if (step.nextStep !== null && (step.awaitsUserInput || ["next", "continue", "begin"].includes(userMessage))) {
    newStepKey = String(step.nextStep);
  }
  
  botResponse = flow[newStepKey];

  // Update user's state in the database
  const oldHistoryPath = tracking.chatHistory ? JSON.parse(tracking.chatHistory) : [];
  const newHistoryPath = newStepKey !== currentStepKey ? [...oldHistoryPath, newStepKey] : oldHistoryPath;

  const updateQuery = 'UPDATE "tracking" SET "currentStep" = $1, "chatHistory" = $2, "lastMessageAt" = NOW() WHERE "userId" = $3';
  await db.query(updateQuery, [newStepKey, JSON.stringify(newHistoryPath), Number(userId)]);

  // Prepare final response with full URLs and delay
  const finalResponse = { ...botResponse };
  if (finalResponse.images && Array.isArray(finalResponse.images)) {
    finalResponse.images = finalResponse.images.map(imgPath => `${API_BASE_URL}${imgPath}`);
  }
  if (finalResponse.attachments && Array.isArray(finalResponse.attachments)) {
    finalResponse.attachments = finalResponse.attachments.map(att => ({ ...att, url: `${API_BASE_URL}${att.url}`}));
  }
  // Add delay to every response for the frontend timer
  finalResponse.delay = botResponse.delay || 5000; // Default to 5 seconds

  return finalResponse;
};

module.exports = { processFlow };
