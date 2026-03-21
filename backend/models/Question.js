const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  part: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },
  category: {
    type: String,
    required: true
    // e.g. Vocabulary, Grammar, WordForm, Preposition, etc.
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  tip: {
    type: String
  },
  question: {
    type: String,
    required: true
  },
  choices: {
    type: [String],
    validate: {
      validator: (v) => v.length === 4,
      message: 'Choices must have exactly 4 items'
    }
  },
  answer: {
    type: Number,
    min: 0,
    max: 3,
    required: true
  },
  explanation: {
    type: String
  },
  tags: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Question', questionSchema);
