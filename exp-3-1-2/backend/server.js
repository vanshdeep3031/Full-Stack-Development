require('dotenv').config();
const express = require('express');
const jwt     = require('jsonwebtoken');
const cors    = require('cors');

const app    = express();
const PORT   = process.env.PORT || 5001;
const SECRET = process.env.JWT_SECRET || 'exp312_super_secret_key';

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// ── Mock user store ────────────────────────────────────────────────────────
const USERS = [
  { id: 1, email: 'alice@lab.com', password: 'Alice@123', name: 'Alice' },
  { id: 2, email: 'bob@lab.com',   password: 'Bob@123',   name: 'Bob'   },
];

// ── Middleware: verify JWT ─────────────────────────────────────────────────
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Malformed token' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// ── Routes ─────────────────────────────────────────────────────────────────
// Public: login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// Protected: dashboard data
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({
    message: `Welcome to the protected dashboard, ${req.user.name}!`,
    user: req.user,
    data: {
      stats: [
        { label: 'Projects',  value: 12 },
        { label: 'Tasks',     value: 34 },
        { label: 'Completed', value: 28 },
      ],
      timestamp: new Date().toISOString(),
    },
  });
});

// Protected: profile
app.get('/api/profile', verifyToken, (req, res) => {
  res.json({
    user: req.user,
    joinDate: '2024-01-15',
    lastLogin: new Date().toISOString(),
  });
});

// Public: token verify helper
app.get('/api/verify', verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

app.listen(PORT, () =>
  console.log(`\n🚀  Exp-3-1-2 backend running on http://localhost:${PORT}\n`)
);
