const bcrypt = require("bcryptjs");
const db = require("../config/db");

const findUserById = async (id) => {
    const userQuery = 'SELECT id, username FROM "users" WHERE id = $1';
    const trackingQuery = 'SELECT "currentStep", "chatHistory" FROM "tracking" WHERE "userId" = $1';

    const userResult = await db.query(userQuery, [id]);
    if (userResult.rows.length === 0) return null;

    const trackingResult = await db.query(trackingQuery, [id]);
    
    const user = userResult.rows[0];
    user.tracking = trackingResult.rows[0] || { currentStep: "0", chatHistory: '["0"]' };

    return user;
};

const registerUser = async (username, password) => {
  if (!username || username.length < 3 || username.length > 20) {
    throw new Error("Username must be between 3 and 20 characters.");
  }
  if (!password || password.trim() === "") {
    throw new Error("Password cannot be blank.");
  }

  const existingUserResult = await db.query('SELECT * FROM "users" WHERE username = $1', [username]);
  if (existingUserResult.rows.length > 0) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const insertUserQuery = 'INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING id, username';
  const newUserResult = await db.query(insertUserQuery, [username, hashedPassword]);
  const newUser = newUserResult.rows[0];

  const insertTrackingQuery = 'INSERT INTO "tracking" ("userId", "chatHistory", "currentStep", "step") VALUES ($1, $2, $3, $4) RETURNING *';
  const trackingResult = await db.query(insertTrackingQuery, [newUser.id, '["0"]', '0', 0]);

  newUser.tracking = trackingResult.rows[0];
  return newUser;
};


const loginUser = async (username, password) => {
    const query = 'SELECT * FROM "users" WHERE username = $1';
    const result = await db.query(query, [username]);
    
    if (result.rows.length === 0) {
        throw new Error("Invalid username or password");
    }

    const user = result.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error("Invalid username or password");
    }

    const trackingQuery = 'SELECT * FROM "tracking" WHERE "userId" = $1';
    const trackingResult = await db.query(trackingQuery, [user.id]);
    user.tracking = trackingResult.rows[0];
    
    // Do not send password back to controller
    delete user.password;
    return user;
};


module.exports = { registerUser, loginUser, findUserById };
