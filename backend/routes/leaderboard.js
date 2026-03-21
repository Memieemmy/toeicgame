const router = require('express').Router();
const User = require('../models/User');
const GameSession = require('../models/GameSession');

// GET /api/leaderboard?period=week&limit=10
router.get('/', async (req, res) => {
  try {
    const { period = 'week', limit = 10 } = req.query;

    if (period === 'all') {
      // All-time: sort by total XP
      const users = await User.find()
        .sort({ xp: -1 })
        .limit(Number(limit))
        .select('nickname xp level targetScore totalQuestions correctAnswers');

      const result = users.map((u, i) => ({
        rank: i + 1,
        nickname: u.nickname,
        xp: u.xp,
        level: u.level,
        targetScore: u.targetScore,
        accuracy: u.totalQuestions > 0 ? Math.round((u.correctAnswers / u.totalQuestions) * 100) : 0
      }));

      return res.json(result);
    }

    // Week / Month — aggregate XP from sessions
    const now = new Date();
    let since;
    if (period === 'week') {
      since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (period === 'month') {
      since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const agg = await GameSession.aggregate([
      { $match: { completedAt: { $gte: since } } },
      { $group: { _id: '$userId', periodXp: { $sum: '$xpEarned' } } },
      { $sort: { periodXp: -1 } },
      { $limit: Number(limit) }
    ]);

    const userIds = agg.map((a) => a._id);
    const users = await User.find({ _id: { $in: userIds } }).select('nickname xp level targetScore totalQuestions correctAnswers');
    const userMap = {};
    users.forEach((u) => { userMap[u._id.toString()] = u; });

    const result = agg.map((a, i) => {
      const u = userMap[a._id.toString()];
      return {
        rank: i + 1,
        nickname: u ? u.nickname : 'Unknown',
        xp: a.periodXp,
        totalXp: u ? u.xp : 0,
        level: u ? u.level : 1,
        targetScore: u ? u.targetScore : 'intermediate',
        accuracy: u && u.totalQuestions > 0 ? Math.round((u.correctAnswers / u.totalQuestions) * 100) : 0
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
