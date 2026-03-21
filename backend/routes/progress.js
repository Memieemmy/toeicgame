const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const GameSession = require('../models/GameSession');
const User = require('../models/User');

// GET /api/progress  — protected, returns progress data for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const sessions = await GameSession.find({ userId: user._id }).sort({ completedAt: -1 });

    // Weekly activity: last 7 days
    const now = new Date();
    const weekly = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);
      day.setHours(0, 0, 0, 0);
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      const daySessions = sessions.filter((s) => s.completedAt >= day && s.completedAt < nextDay);
      const questionsCount = daySessions.reduce((acc, s) => acc + (s.questions ? s.questions.length : 0), 0);
      weekly.push({
        date: day.toISOString().split('T')[0],
        questions: questionsCount,
        xp: daySessions.reduce((acc, s) => acc + s.xpEarned, 0)
      });
    }

    // Per-part stats
    const partStats = {};
    sessions.forEach((s) => {
      const part = s.part || 5;
      if (!partStats[part]) partStats[part] = { total: 0, correct: 0 };
      partStats[part].total += s.questions ? s.questions.length : 0;
      partStats[part].correct += s.score || 0;
    });

    const accuracy = user.totalQuestions > 0
      ? Math.round((user.correctAnswers / user.totalQuestions) * 100)
      : 0;

    const xpForNextLevel = user.level * 200;
    const xpProgress = user.xp % 200;

    res.json({
      user: {
        nickname: user.nickname,
        level: user.level,
        xp: user.xp,
        streak: user.streak,
        targetScore: user.targetScore,
        weakAreas: user.weakAreas,
        totalQuestions: user.totalQuestions,
        correctAnswers: user.correctAnswers,
        accuracy
      },
      xpForNextLevel,
      xpProgress,
      weekly,
      partStats,
      recentSessions: sessions.slice(0, 5)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
