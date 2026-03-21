require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.TOEIC_PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/game', require('./routes/game'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/progress', require('./routes/progress'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

async function startServer() {
  let mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/toeicup';

  // ถ้า connect local ไม่ได้ ใช้ in-memory MongoDB สำหรับ dev
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
    console.log('✅ MongoDB connected:', mongoUri);
  } catch (err) {
    console.log('⚠️  Local MongoDB not found, starting in-memory MongoDB...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    mongoUri = mongod.getUri();
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB (in-memory) connected:', mongoUri);

    // Seed ข้อมูลตัวอย่าง
    await seedData();
  }

  app.listen(PORT, () => {
    console.log(`🚀 TOEICup backend running on http://localhost:${PORT}`);
  });
}

async function seedData() {
  const Question = require('./models/Question');
  const count = await Question.countDocuments();
  if (count > 0) return;

  const questions = [
    { part: 5, category: 'Preposition', level: 'intermediate', tip: 'ใช้ "by" เมื่อหมายถึง "ภายในเวลา" (deadline) เช่น "by Friday" ส่วน "until" ใช้เมื่อกริยาดำเนินต่อเนื่องจนถึงเวลานั้น', question: 'The manager asked all employees to submit their monthly reports ______ Friday afternoon.', choices: ['until', 'by', 'during', 'within'], answer: 1, explanation: '"by + time" หมายถึง ภายในเวลา (deadline) — Submit by Friday = ส่งภายในวันศุกร์ ❌ until = ต่อเนื่องจนถึง ❌ during = ระหว่าง ❌ within = ภายใน (ใช้กับระยะเวลา)', tags: ['preposition', 'time'] },
    { part: 5, category: 'Vocabulary', level: 'intermediate', tip: '"Mandatory" = บังคับ, "Optional" = ไม่บังคับ, "Voluntary" = สมัครใจ ความแตกต่างนี้ออกสอบบ่อยมาก', question: 'Attendance at the safety training session is ______ for all new employees.', choices: ['optional', 'voluntary', 'mandatory', 'flexible'], answer: 2, explanation: '"Mandatory" = บังคับต้องทำ ใช้กับกฎระเบียบที่ต้องปฏิบัติตาม ❌ optional = ไม่บังคับ ❌ voluntary = สมัครใจ ❌ flexible = ยืดหยุ่น', tags: ['vocabulary', 'adjective'] },
    { part: 5, category: 'Grammar', level: 'beginner', tip: 'Present Perfect ใช้กับเหตุการณ์ที่เกิดในอดีตและมีผลกับปัจจุบัน — มักใช้กับ "already", "yet", "since", "for"', question: 'The company ______ its new product line since last month.', choices: ['launch', 'launched', 'has launched', 'will launch'], answer: 2, explanation: '"since last month" บ่งบอกว่าต้องใช้ Present Perfect = "has launched"', tags: ['grammar', 'tense'] },
    { part: 5, category: 'Word Form', level: 'intermediate', tip: 'ดูว่าต้องการ noun, verb, adjective หรือ adverb โดยดูจากตำแหน่งในประโยค หลัง "The" ต้องเป็น noun', question: 'The ______ of the new policy will take effect next quarter.', choices: ['implement', 'implementing', 'implementation', 'implemented'], answer: 2, explanation: 'หลัง "The" ต้องการ noun = "implementation" (การนำไปใช้)', tags: ['word-form', 'noun'] },
    { part: 5, category: 'Conjunction', level: 'advanced', tip: '"Despite" + noun phrase ส่วน "Although" + clause (subject + verb) ความแตกต่างนี้สำคัญมากใน TOEIC', question: '______ the heavy rain, the outdoor event was not cancelled.', choices: ['Although', 'Despite', 'Even though', 'Because'], answer: 1, explanation: '"Despite" + noun phrase ("the heavy rain") — ไม่มี verb ❌ Although/Even though ต้องตามด้วย subject+verb', tags: ['conjunction', 'contrast'] },
    { part: 5, category: 'Vocabulary', level: 'intermediate', tip: '"Facilitate" = อำนวยความสะดวก เป็นคำที่ใช้บ่อยในบริบทธุรกิจ TOEIC', question: 'The HR manager will ______ the discussion between the two departments.', choices: ['negotiate', 'facilitate', 'demonstrate', 'participate'], answer: 1, explanation: '"Facilitate" = อำนวยความสะดวก / ช่วยให้การประชุมดำเนินไปได้ราบรื่น', tags: ['vocabulary', 'verb'] },
    { part: 5, category: 'Preposition', level: 'beginner', tip: '"responsible for" เป็น fixed collocation ที่ต้องจำ ออกสอบบ่อยมาก', question: 'Ms. Johnson is responsible ______ managing the marketing budget.', choices: ['to', 'for', 'with', 'of'], answer: 1, explanation: '"responsible for" = รับผิดชอบต่อ (collocations ที่ต้องจำ)', tags: ['preposition', 'collocation'] },
    { part: 5, category: 'Grammar', level: 'intermediate', tip: 'Passive voice: subject + be + past participle ใช้เมื่อ subject เป็น "ผู้ถูกกระทำ"', question: 'The annual report ______ by the finance team every December.', choices: ['prepares', 'is prepared', 'preparing', 'has prepared'], answer: 1, explanation: '"The annual report" ถูกกระทำ ต้องใช้ Passive = "is prepared"', tags: ['grammar', 'passive'] },
    { part: 5, category: 'Vocabulary', level: 'advanced', tip: '"Streamline" = ทำให้กระบวนการมีประสิทธิภาพมากขึ้น คำ Business TOEIC ที่ใช้บ่อย', question: "The new software will ______ the company's inventory management process.", choices: ['complicate', 'streamline', 'abandon', 'duplicate'], answer: 1, explanation: '"Streamline" = ลดขั้นตอน/ทำให้มีประสิทธิภาพ', tags: ['vocabulary', 'business'] },
    { part: 5, category: 'Word Form', level: 'intermediate', tip: 'Adverb ลงท้ายด้วย "-ly" ใช้ขยาย verb หรือ adjective ดูตำแหน่งในประโยคเสมอ', question: 'The team completed the project ______ ahead of the deadline.', choices: ['significant', 'significance', 'significantly', 'signify'], answer: 2, explanation: '"significantly" = adverb ขยาย "ahead of the deadline"', tags: ['word-form', 'adverb'] },
    { part: 6, category: 'Grammar', level: 'intermediate', tip: 'ใน Part 6 ต้องอ่าน context ทั้งย่อหน้าก่อนเลือกคำตอบ', question: 'All employees ______ to complete the online training by end of month.', choices: ['require', 'required', 'are required', 'requiring'], answer: 2, explanation: 'Passive voice "are required" เหมาะกับ context นโยบายบริษัท', tags: ['grammar', 'passive'] },
    { part: 7, category: 'Reading', level: 'intermediate', tip: 'ใน Part 7 อ่าน question ก่อน แล้วค่อย scan หาคำตอบ', question: 'According to the memo, when is the deadline for submitting expense reports?', choices: ['March 15', 'March 20', 'March 25', 'March 31'], answer: 2, explanation: 'ต้องอ่านจาก passage — คำตอบอยู่ใน detail ของ memo', tags: ['reading', 'detail'] },
  ];

  await Question.insertMany(questions);
  console.log(`✅ Seeded ${questions.length} questions`);
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
