const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mysecretkey";

// Dummy users
const users = [
  { id: 1, username: "admin", password: "123", role: "admin" },
  { id: 2, username: "user", password: "123", role: "user" }
];

// LOGIN API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(user, SECRET, { expiresIn: "1h" });

  res.json({
    token,
    user: {
      username: user.username,
      role: user.role
    }
  });
});

// Middleware: Verify Token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ error: "Missing token" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// Middleware: Role Check
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
}

// Protected Route
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

// Admin Route
app.get("/api/admin", verifyToken, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));