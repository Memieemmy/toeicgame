const router = require('express').Router();
const Question = require('../models/Question');

// GET /api/questions?part=5&level=intermediate&limit=10
router.get('/', async (req, res) => {
  try {
    const { part, level, category, limit = 10 } = req.query;
    const filter = {};
    if (part) filter.part = Number(part);
    if (level) filter.level = level;
    if (category) filter.category = category;

    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: Number(limit) } }
    ]);

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/questions/:id
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
