const db = require("./db");

// Insert new user in the database 
async function createUser(username, email, hashedPassword) {
  return db.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, hashedPassword]
  );
}

// Find user by email in the database
async function findUserByEmail(email) {
  return db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
}

module.exports = {
  createUser,
  findUserByEmail
};
