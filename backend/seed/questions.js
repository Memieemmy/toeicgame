require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Question = require('../models/Question');

const questions = [
  // 1 — Preposition
  {
    part: 5,
    category: 'Preposition',
    level: 'intermediate',
    tip: 'ใช้ "by" เมื่อหมายถึง "ภายในเวลา" (deadline) เช่น "by Friday" = ภายในวันศุกร์ ส่วน "until" ใช้เมื่อกริยาดำเนินต่อเนื่องจนถึงเวลานั้น',
    question: 'The manager asked all employees to submit their monthly reports ______ Friday afternoon.',
    choices: ['until', 'by', 'during', 'within'],
    answer: 1,
    explanation: '"by + time" แปลว่า "ภายใน" ซึ่งเหมาะกับ deadline. "until" ใช้กับกริยาต่อเนื่อง เช่น "wait until Friday". "during" ใช้กับช่วงเวลา "within" ใช้กับระยะเวลา เช่น "within 3 days"',
    tags: ['preposition', 'by', 'deadline']
  },
  // 2 — Word Form (noun)
  {
    part: 5,
    category: 'WordForm',
    level: 'intermediate',
    tip: 'หลัง "reach an" ต้องตามด้วย Noun. "agree" เป็น verb → "agreement" เป็น noun',
    question: 'After hours of negotiation, the two parties finally reached an ______ on the contract terms.',
    choices: ['agree', 'agreed', 'agreement', 'agreeable'],
    answer: 2,
    explanation: '"reach an agreement" เป็น collocation มาตรฐาน. "agree" = verb, "agreed" = past tense/adj, "agreeable" = adj. ตำแหน่งหลัง "an" ต้องเป็น noun → "agreement"',
    tags: ['word-form', 'noun', 'collocation']
  },
  // 3 — Vocabulary
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"reimburse" หมายถึงการคืนเงินที่จ่ายไปก่อน เป็นคำที่ใช้บ่อยในบริบทธุรกิจของ TOEIC',
    question: 'Employees who travel for business purposes will be ______ for all reasonable expenses.',
    choices: ['compensated', 'reimbursed', 'rewarded', 'recovered'],
    answer: 1,
    explanation: '"reimburse" = คืนเงินค่าใช้จ่ายที่จ่ายไปก่อน. "compensate" = ชดเชย (กว้างกว่า). "reward" = ให้รางวัล. "recover" = ฟื้นตัว/กู้คืน. ในบริบท "expenses" ต้องใช้ "reimburse"',
    tags: ['vocabulary', 'business', 'finance']
  },
  // 4 — Grammar (verb tense)
  {
    part: 5,
    category: 'Grammar',
    level: 'intermediate',
    tip: 'เมื่อประโยค if-clause เป็น simple past → main clause ต้องใช้ "would + V1" (Second Conditional)',
    question: 'If the company ______ its prices, it would attract more customers.',
    choices: ['reduces', 'reduced', 'will reduce', 'has reduced'],
    answer: 1,
    explanation: 'Second Conditional (สมมติสถานการณ์ที่ไม่เป็นจริงในปัจจุบัน): If + Past Simple → would + V1. ดังนั้น "reduced" เป็นคำตอบที่ถูกต้อง',
    tags: ['grammar', 'conditional', 'verb-tense']
  },
  // 5 — Preposition
  {
    part: 5,
    category: 'Preposition',
    level: 'intermediate',
    tip: '"in charge of" = รับผิดชอบ เป็น fixed phrase ที่ออกสอบบ่อย',
    question: 'Ms. Tanaka will be ______ charge of the marketing department while the director is away.',
    choices: ['on', 'at', 'in', 'for'],
    answer: 2,
    explanation: '"in charge of" เป็น fixed phrase แปลว่า "รับผิดชอบ/ดูแล". ห้ามสับสนกับ "on duty" หรือ "at work" ซึ่งมีความหมายต่างกัน',
    tags: ['preposition', 'fixed-phrase']
  },
  // 6 — Word Form (adjective)
  {
    part: 5,
    category: 'WordForm',
    level: 'intermediate',
    tip: 'ตำแหน่งก่อน noun ต้องใช้ adjective. คำที่ลงท้าย -ive มักเป็น adjective',
    question: 'The new software interface is much more ______ than the previous version.',
    choices: ['intuit', 'intuitively', 'intuition', 'intuitive'],
    answer: 3,
    explanation: '"more + adjective" ต้องการ adjective ในรูป comparative. "intuitive" (adj) = เข้าใจง่าย/ใช้งานง่ายตามสัญชาตญาณ. "intuit" = verb, "intuitively" = adverb, "intuition" = noun',
    tags: ['word-form', 'adjective', 'comparative']
  },
  // 7 — Vocabulary
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"substantial" หมายถึง "มีนัยสำคัญ/มาก" ใช้ในบริบทธุรกิจเมื่อพูดถึงการเพิ่มขึ้นหรือลดลงที่มีนัยสำคัญ',
    question: 'The company reported a ______ increase in revenue during the third quarter.',
    choices: ['subtle', 'substantial', 'sufficient', 'subjective'],
    answer: 1,
    explanation: '"substantial" = มีนัยสำคัญ, มาก (significant amount). "subtle" = ละเอียดอ่อน/ไม่ชัดเจน. "sufficient" = เพียงพอ. "subjective" = ขึ้นอยู่กับความคิดเห็น',
    tags: ['vocabulary', 'finance', 'business']
  },
  // 8 — Grammar (passive voice)
  {
    part: 5,
    category: 'Grammar',
    level: 'intermediate',
    tip: 'Passive voice = "be + past participle". ดูว่าประธานเป็นผู้กระทำหรือถูกกระทำ',
    question: 'The annual report ______ to all shareholders by the end of this month.',
    choices: ['will send', 'will be sent', 'sends', 'is sending'],
    answer: 1,
    explanation: '"the annual report" เป็นสิ่งที่ถูกส่ง (ไม่ใช่ผู้ส่ง) → ต้องใช้ Passive Voice. "will be sent" = Future Passive. "will send" = Active ที่ประธานเป็นผู้ส่งเอง ซึ่งไม่ถูกต้องในบริบทนี้',
    tags: ['grammar', 'passive-voice', 'future']
  },
  // 9 — Vocabulary
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"consecutive" = ต่อเนื่องกันโดยไม่มีการหยุด ใช้กับ days, weeks, years, losses, wins',
    question: 'The factory has operated without any major accidents for five ______ years.',
    choices: ['continual', 'continuous', 'consecutive', 'concurrent'],
    answer: 2,
    explanation: '"consecutive" = ต่อเนื่องในลำดับ (one after another without gap). "continual" = เกิดซ้ำหลายครั้ง. "continuous" = ไม่หยุดตลอดเวลา. "concurrent" = เกิดพร้อมกัน',
    tags: ['vocabulary', 'adjective', 'time']
  },
  // 10 — Word Form (adverb)
  {
    part: 5,
    category: 'WordForm',
    level: 'intermediate',
    tip: 'Adverb ขยาย verb หรือ adjective. ตำแหน่งก่อน adjective "prepared" ต้องใช้ adverb',
    question: 'The team was ______ prepared for the client presentation.',
    choices: ['thorough', 'thoroughly', 'thoroughness', 'thoroughgoing'],
    answer: 1,
    explanation: '"thoroughly" เป็น adverb ขยาย "prepared" (past participle ทำหน้าที่เป็น adjective). "thorough" = adjective, "thoroughness" = noun, "thoroughgoing" = adjective แปลว่า ละเอียดถี่ถ้วน แต่ไม่ใช่ adverb',
    tags: ['word-form', 'adverb']
  },
  // 11 — Grammar (relative clause)
  {
    part: 5,
    category: 'Grammar',
    level: 'intermediate',
    tip: '"whose" ใช้แสดงความเป็นเจ้าของใน relative clause. "whose + noun" = ของใคร',
    question: 'The employee ______ performance exceeded expectations will receive a bonus.',
    choices: ['who', 'whom', 'whose', 'which'],
    answer: 2,
    explanation: '"whose" ใช้แสดงความเป็นเจ้าของ: "whose performance" = performance ของพนักงานคนนั้น. "who" = ใช้เป็นประธาน, "whom" = ใช้เป็นกรรม, "which" = ใช้กับสิ่งของ ไม่ใช่คน',
    tags: ['grammar', 'relative-clause', 'whose']
  },
  // 12 — Preposition
  {
    part: 5,
    category: 'Preposition',
    level: 'intermediate',
    tip: '"on behalf of" = แทน/ในนามของ ใช้ในเอกสารทางการ',
    question: 'Ms. Sombat signed the contract ______ behalf of the entire board of directors.',
    choices: ['in', 'on', 'at', 'for'],
    answer: 1,
    explanation: '"on behalf of" = ในนามของ/แทน เป็น fixed phrase. "in behalf of" ใช้ในภาษาอเมริกันเก่า แต่ "on behalf of" เป็น standard ทั้ง British และ American English ในปัจจุบัน',
    tags: ['preposition', 'fixed-phrase', 'formal']
  },
  // 13 — Vocabulary
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"mandatory" = บังคับ, จำเป็นต้องทำ ต่างจาก "optional" = ไม่บังคับ',
    question: 'Attendance at the safety training session is ______ for all new employees.',
    choices: ['optional', 'voluntary', 'mandatory', 'preferential'],
    answer: 2,
    explanation: '"mandatory" = บังคับ (required by law or rule). "optional" = ไม่บังคับ. "voluntary" = สมัครใจ. "preferential" = เกี่ยวกับการให้สิทธิพิเศษ บริบท "for all new employees" บอกว่าบังคับ',
    tags: ['vocabulary', 'adjective', 'HR']
  },
  // 14 — Word Form (noun suffix)
  {
    part: 5,
    category: 'WordForm',
    level: 'intermediate',
    tip: 'ตำแหน่งหลัง "the" และก่อน "of" ต้องใช้ Noun. "-tion" suffix = noun',
    question: 'The ______ of the new policy was announced at last week\'s staff meeting.',
    choices: ['implement', 'implementing', 'implementation', 'implemented'],
    answer: 2,
    explanation: '"the + [noun] + of" เป็นโครงสร้างที่ต้องการ noun. "implementation" (noun) = การนำไปใช้. "implement" = verb, "implementing" = gerund/present participle, "implemented" = past participle/adjective',
    tags: ['word-form', 'noun', 'suffix-tion']
  },
  // 15 — Grammar (article / determiner)
  {
    part: 5,
    category: 'Grammar',
    level: 'intermediate',
    tip: '"Despite" + noun phrase (ไม่ตามด้วย clause), "Although" + clause (subject + verb)',
    question: '______ the heavy rain, the outdoor ceremony proceeded as planned.',
    choices: ['Although', 'Despite', 'However', 'Even though'],
    answer: 1,
    explanation: '"Despite" + noun phrase → "despite the heavy rain" ถูกต้อง. "Although/Even though" + clause (ต้องมี subject + verb). "However" เป็น conjunctive adverb ใช้หลัง semicolon หรือขึ้นต้นประโยค',
    tags: ['grammar', 'conjunction', 'despite-although']
  },
  // 16 — Vocabulary
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"fluctuate" = เปลี่ยนแปลงขึ้นลงไม่แน่นอน ใช้กับราคา, ค่าเงิน, อุณหภูมิ',
    question: 'The stock prices have been ______ significantly over the past few weeks due to global uncertainty.',
    choices: ['fluctuating', 'accumulating', 'stabilizing', 'depreciating'],
    answer: 0,
    explanation: '"fluctuate" = ขึ้นๆ ลงๆ ไม่แน่นอน เหมาะกับ "global uncertainty". "accumulate" = สะสม (เพิ่มขึ้น). "stabilize" = คงที่ (ตรงข้ามกับ uncertainty). "depreciate" = ลดลงทิศทางเดียว',
    tags: ['vocabulary', 'finance', 'verb']
  },
  // 17 — Preposition
  {
    part: 5,
    category: 'Preposition',
    level: 'intermediate',
    tip: '"result in" = ส่งผลให้เกิด (cause → effect). "result from" = เกิดจาก (effect ← cause)',
    question: 'The merger is expected to ______ in significant cost savings for both companies.',
    choices: ['result', 'lead', 'end', 'turn'],
    answer: 0,
    explanation: '"result in" = ส่งผลให้เกิด เป็น verb phrase standard ในบริบทธุรกิจ. "lead to" ก็ถูกต้องแต่ตัวเลือกไม่มี "to" ต่อ. "end in" = จบลงด้วย. "turn into" = กลายเป็น. ที่ถูกคือ "result" (in)',
    tags: ['preposition', 'verb-phrase', 'business']
  },
  // 18 — Word Form (comparative adjective)
  {
    part: 5,
    category: 'WordForm',
    level: 'intermediate',
    tip: 'ตำแหน่งหลัง "become more" หรือ "the most" ต้องใช้ adjective',
    question: 'Working from home has become increasingly ______ among employees in recent years.',
    choices: ['popularity', 'popular', 'popularly', 'popularize'],
    answer: 1,
    explanation: 'หลัง "become increasingly" ต้องใช้ adjective ที่บอกสภาพ. "popular" (adj) = เป็นที่นิยม. "popularity" = noun, "popularly" = adverb ขยาย verb, "popularize" = verb',
    tags: ['word-form', 'adjective', 'predicate']
  },
  // 19 — Grammar (subject-verb agreement)
  {
    part: 5,
    category: 'Grammar',
    level: 'intermediate',
    tip: 'เมื่อประธานเป็น "each of + plural noun" → verb เป็น singular (each = one by one)',
    question: 'Each of the department heads ______ required to submit a quarterly budget report.',
    choices: ['are', 'were', 'is', 'have been'],
    answer: 2,
    explanation: '"Each" เป็นประธาน singular → verb ต้องเป็น singular. "Each of the heads is required" ถูกต้อง. "are/were/have been" เป็น plural ซึ่งไม่ตรงกับ "each"',
    tags: ['grammar', 'subject-verb-agreement', 'each']
  },
  // 20 — Vocabulary
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"renowned" = มีชื่อเสียง/เป็นที่รู้จักในทางบวก ใช้แทน "famous" ในบริบททางการ',
    question: 'The hotel is ______ for its exceptional service and luxurious accommodations.',
    choices: ['notorious', 'renowned', 'apparent', 'reputable'],
    answer: 1,
    explanation: '"renowned for" = มีชื่อเสียงในด้าน (บวก). "notorious" = มีชื่อเสียงในด้านลบ. "apparent" = ชัดเจน/เห็นได้ชัด. "reputable" = น่าเชื่อถือ แต่ไม่ใช้กับ "for + noun" ในแบบนี้',
    tags: ['vocabulary', 'adjective', 'hotel', 'collocation']
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/toeicup');
    console.log('Connected to MongoDB');

    await Question.deleteMany({ part: 5 });
    console.log('Cleared existing Part 5 questions');

    const inserted = await Question.insertMany(questions);
    console.log(`Inserted ${inserted.length} questions successfully`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
