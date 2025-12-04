const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authModel = require("../models/authModel");

async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await authModel.createUser(username, email, hashed);

    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Registration failed" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await authModel.findUserByEmail(email);

    if (result.rows.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed" });
  }
}

module.exports = {
  register,
  login
};
