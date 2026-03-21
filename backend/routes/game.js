const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const Question = require('../models/Question');
const GameSession = require('../models/GameSession');
const User = require('../models/User');

// POST /api/game/start  — returns 10 questions for part/level
router.post('/start', authMiddleware, async (req, res) => {
  try {
    const { part, level, count = 10 } = req.body;
    const filter = {};
    if (part) filter.part = Number(part);
    if (level) filter.level = level;

    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: Number(count) } }
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this filter' });
    }

    res.json({ questions, sessionStartedAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/game/submit  — submit answers, calculate score, award XP
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { questionIds, answers, part, duration } = req.body;

    if (!questionIds || !answers || questionIds.length !== answers.length) {
      return res.status(400).json({ message: 'Invalid submission data' });
    }

    const questions = await Question.find({ _id: { $in: questionIds } });
    const questionMap = {};
    questions.forEach((q) => { questionMap[q._id.toString()] = q; });

    let correct = 0;
    questionIds.forEach((qid, i) => {
      const q = questionMap[qid];
      if (q && answers[i] === q.answer) correct++;
    });

    const total = questionIds.length;
    const accuracy = Math.round((correct / total) * 100);
    const xpEarned = correct * 10;

    // Save session
    const session = await GameSession.create({
      userId: req.user._id,
      part: part || null,
      questions: questionIds,
      answers,
      score: correct,
      xpEarned,
      duration: duration || 0,
      completedAt: new Date()
    });

    // Update user stats
    const user = await User.findById(req.user._id);
    user.xp += xpEarned;
    user.totalQuestions += total;
    user.correctAnswers += correct;
    user.recalcLevel();

    // Update streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastPlayed = user.lastPlayedDate ? new Date(user.lastPlayedDate) : null;
    if (lastPlayed) {
      lastPlayed.setHours(0, 0, 0, 0);
      const diff = (today - lastPlayed) / (1000 * 60 * 60 * 24);
      if (diff === 1) user.streak += 1;
      else if (diff > 1) user.streak = 1;
      // diff === 0 means same day, keep streak
    } else {
      user.streak = 1;
    }
    user.lastPlayedDate = new Date();

    await user.save();

    res.json({
      correct,
      total,
      accuracy,
      xpEarned,
      sessionId: session._id,
      userXp: user.xp,
      userLevel: user.level,
      userStreak: user.streak
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/game/history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const sessions = await GameSession.find({ userId: req.user._id })
      .sort({ completedAt: -1 })
      .limit(20)
      .populate('questions', 'part category');

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
