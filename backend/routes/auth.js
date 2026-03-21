const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'toeicup-secret', { expiresIn: '30d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { nickname, email, password, targetScore, weakAreas } = req.body;
    if (!nickname) return res.status(400).json({ message: 'Nickname is required' });

    const exists = await User.findOne({ nickname });
    if (exists) return res.status(409).json({ message: 'Nickname already taken' });

    const user = await User.create({ nickname, email, password, targetScore, weakAreas });
    const token = signToken(user._id);
    res.status(201).json({ token, user: { _id: user._id, nickname: user.nickname, level: user.level, xp: user.xp, streak: user.streak, targetScore: user.targetScore } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { nickname, password } = req.body;
    const user = await User.findOne({ nickname });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    if (password && user.password) {
      const valid = await user.comparePassword(password);
      if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user._id);
    res.json({ token, user: { _id: user._id, nickname: user.nickname, level: user.level, xp: user.xp, streak: user.streak, targetScore: user.targetScore, weakAreas: user.weakAreas } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
