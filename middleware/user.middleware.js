const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !String(authHeader).startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header is missing or malformed' });
    }

    const authToken = authHeader.split(" ")[1];
    if (!authToken) {
      return res.status(401).json({ message: 'Auth token is missing' });
    }

    const { id } = jwt.verify(authToken, JWT_SECRET);
    req.user = id; // Attach user ID to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticate };