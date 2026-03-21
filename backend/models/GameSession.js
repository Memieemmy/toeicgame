const mongoose = require('mongoose');

const gameSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  part: {
    type: Number
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  answers: {
    type: [Number],
    default: []
  },
  score: {
    type: Number,
    default: 0
  },
  xpEarned: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number, // seconds
    default: 0
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GameSession', gameSessionSchema);
