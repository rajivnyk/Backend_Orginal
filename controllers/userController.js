const { registerUser, loginUser, findUserById } = require("../services/user.service");
const { flow } = require("../services/flow");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const API_BASE_URL = process.env.API_BASE_URL;

// This function rebuilds the chat history from a saved path of step keys
const rebuildHistoryFromPath = (path) => {
  if (!path || path.length === 0) return [];
  
  let messages = [];
  path.forEach((stepKey, index) => {
    const step = flow[stepKey];
    if (!step) return;

    // Add the user's "Next" message that led to this step
    if (index > 0) {
      const prevStepKey = path[index - 1];
      const prevStep = flow[prevStepKey];
      const userMessageText = prevStep.continuePrompt ? "Next" : "Continue";
      messages.push({
        id: `user-rebuilt-${index}`,
        sender: "user",
        text: userMessageText,
      });
    }

    // Add the bot's message for the current step
    const botMsg = {
      id: `bot-rebuilt-${index}`,
      sender: "bot",
      text: step.text,
      images: (step.images || []).map(imgPath => `${API_BASE_URL}${imgPath}`),
      attachments: (step.attachments || []).map(att => ({...att, url: `${API_BASE_URL}${att.url}`})),
      continuePrompt: step.continuePrompt,
      delay: step.delay || 5000, // Pass delay to frontend
    };
    messages.push(botMsg);
  });
  return messages;
};

const handleRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await registerUser(username, password);
    
    const initialHistory = rebuildHistoryFromPath(["0"]);
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "7h" });

    res.status(201).json({
      token,
      message: "Signup successful",
      userId: newUser.id,
      chatHistory: initialHistory,
      currentStep: newUser.tracking.currentStep,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);

    const historyPath = user.tracking.chatHistory ? JSON.parse(user.tracking.chatHistory) : ["0"];
    const chatHistory = rebuildHistoryFromPath(historyPath);
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7h" });

    res.status(200).json({
      token,
      message: "Login successful",
      userId: user.id,
      chatHistory: chatHistory,
      currentStep: user.tracking.currentStep,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleCheckToken = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "No active session" });
  }

  try {
    const user = await findUserById(req.user);

    if (user && user.tracking) {
      const historyPath = user.tracking.chatHistory ? JSON.parse(user.tracking.chatHistory) : ["0"];
      const chatHistory = rebuildHistoryFromPath(historyPath);
      res.status(200).json({
        message: "Session is active",
        userId: user.id,
        chatHistory: chatHistory,
        currentStep: user.tracking.currentStep,
      });
    } else {
      res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleRegister, handleLogin, handleCheckToken, rebuildHistoryFromPath };
