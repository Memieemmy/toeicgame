require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Question = require('../models/Question');

const questions = [
  // ─── PART 5 — Incomplete Sentences (40 questions) ───────────────────────────

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
  // 15 — Grammar (conjunction vs preposition)
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
  },

  // ── NEW Part 5 questions (21–40) ────────────────────────────────────────────

  // 21 — Conjunction (unless)
  {
    part: 5,
    category: 'Conjunction',
    level: 'intermediate',
    tip: '"Unless" = "if not" ใช้กับ present simple ใน unless-clause แม้จะพูดถึงอนาคต ห้ามใช้ will ใน unless-clause',
    question: 'Unless the shipment ______ by Thursday, we will need to cancel the order.',
    choices: ['arrives', 'will arrive', 'arrived', 'has arrived'],
    answer: 0,
    explanation: '"Unless + present simple" ใช้สำหรับเงื่อนไขในอนาคต ไม่ใช้ will ใน unless-clause เช่นเดียวกับ if-clause. "arrives" (present simple) จึงถูกต้อง',
    tags: ['conjunction', 'unless', 'present-simple', 'conditional']
  },
  // 22 — Vocabulary (allocate)
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"allocate" = จัดสรร (ทรัพยากร/งบประมาณ) เป็นคำศัพท์ธุรกิจที่ออกสอบบ่อยใน TOEIC',
    question: 'The company has decided to ______ its marketing budget by 20% next quarter.',
    choices: ['allocate', 'deplete', 'reduce', 'omit'],
    answer: 0,
    explanation: '"allocate" = จัดสรรงบประมาณให้กับส่วนต่างๆ. "deplete" = ใช้จนหมด. "reduce" = ลดลง. "omit" = ละเว้น/ตัดออก. บริบท "marketing budget" + "20% next quarter" บ่งชี้ว่าจัดสรรเพิ่ม',
    tags: ['vocabulary', 'business', 'budget', 'allocate']
  },
  // 23 — Article / Determiner
  {
    part: 5,
    category: 'Grammar',
    level: 'intermediate',
    tip: '"all + plural noun" = ทั้งหมด ใช้กับกลุ่มคน. "every/each" ตามด้วย singular noun',
    question: 'The new policy applies to ______ employees who joined after January 1st.',
    choices: ['all', 'every', 'each', 'any'],
    answer: 0,
    explanation: '"all employees" ใช้กับ plural noun ได้โดยตรง. "every/each" ต้องตามด้วย singular noun (every employee, each employee). "any" มีความหมายว่า "ใดก็ตาม" ซึ่งเปลี่ยนความหมาย',
    tags: ['grammar', 'determiner', 'all-every-each']
  },
  // 24 — Advanced Grammar (inversion)
  {
    part: 5,
    category: 'Grammar',
    level: 'advanced',
    tip: '"Not only ... but also" เมื่อขึ้นต้นประโยคต้องทำ Inversion: Not only + auxiliary + subject + verb',
    question: 'Not only ______ the project on time, but the team also came in under budget.',
    choices: ['they completed', 'did they complete', 'they did complete', 'completed they'],
    answer: 1,
    explanation: 'เมื่อ "Not only" ขึ้นต้นประโยค ต้องใช้ Inversion: Not only + did + subject + base verb. จึงเป็น "did they complete". ถ้า "Not only" อยู่กลางประโยคไม่ต้องทำ Inversion',
    tags: ['grammar', 'inversion', 'not-only', 'advanced']
  },
  // 25 — Grammar (relative pronoun - who)
  {
    part: 5,
    category: 'Grammar',
    level: 'intermediate',
    tip: '"who" ใช้กับคน เมื่อทำหน้าที่เป็น subject ของ relative clause',
    question: 'The CEO, ______ was previously the CFO, announced her resignation yesterday.',
    choices: ['who', 'whose', 'whom', 'which'],
    answer: 0,
    explanation: '"who" ใช้กับคน (the CEO) และทำหน้าที่เป็น subject ของ relative clause (was previously the CFO). "whom" = กรรม, "whose" = แสดงความเป็นเจ้าของ, "which" = ใช้กับสิ่งของ',
    tags: ['grammar', 'relative-pronoun', 'who', 'clause']
  },
  // 26 — Conjunction (although)
  {
    part: 5,
    category: 'Conjunction',
    level: 'intermediate',
    tip: '"although" = แม้ว่า ใช้กับ clause (subject + verb). ตรงข้ามกับ "because" ที่บอกเหตุผล',
    question: '______ the project was delayed, the final product met all quality standards.',
    choices: ['Because', 'Although', 'Therefore', 'Moreover'],
    answer: 1,
    explanation: '"Although" = แม้ว่า แสดง contrast ระหว่างสองเหตุการณ์. "Because" = เพราะว่า (บอกเหตุผล). "Therefore" และ "Moreover" เป็น conjunctive adverbs ใช้ขึ้นต้นประโยคใหม่',
    tags: ['conjunction', 'although', 'contrast']
  },
  // 27 — Verb Tense (present perfect)
  {
    part: 5,
    category: 'Grammar',
    level: 'intermediate',
    tip: 'Present Perfect ใช้กับ "since + point in time" หรือ "for + duration" แสดงว่าเกิดขึ้นและยังคงดำเนินอยู่',
    question: 'The company ______ its headquarters in Singapore since 2018.',
    choices: ['maintains', 'maintained', 'has maintained', 'had maintained'],
    answer: 2,
    explanation: '"since 2018" บ่งชี้การใช้ Present Perfect: have/has + past participle. "has maintained" = ยังคงดูแลอยู่จนถึงปัจจุบัน. "had maintained" = Past Perfect ใช้กับเหตุการณ์ที่จบก่อนอีกเหตุการณ์ในอดีต',
    tags: ['grammar', 'present-perfect', 'since', 'verb-tense']
  },
  // 28 — Pronoun (reflexive)
  {
    part: 5,
    category: 'Grammar',
    level: 'intermediate',
    tip: 'Reflexive pronouns (himself, herself, themselves) ใช้เมื่อ subject และ object เป็นคนเดียวกัน หรือใช้เน้น "ด้วยตัวเอง"',
    question: 'The director reviewed all the financial documents ______ before presenting them to the board.',
    choices: ['him', 'his', 'himself', 'his own'],
    answer: 2,
    explanation: '"himself" เป็น reflexive pronoun ใช้เน้นว่า "ด้วยตัวเอง" (emphatic use). subject = the director (he), ดังนั้น reflexive = himself. "him" = object pronoun ใช้ต่างกัน. "his own" ต้องการ noun ตามหลัง',
    tags: ['grammar', 'pronoun', 'reflexive']
  },
  // 29 — Preposition (according to)
  {
    part: 5,
    category: 'Preposition',
    level: 'intermediate',
    tip: '"according to" = ตามที่/อ้างอิงจาก ใช้นำหน้าแหล่งข้อมูลหรือกฎ',
    question: '______ the latest market survey, consumer confidence has reached a five-year high.',
    choices: ['According to', 'Regardless of', 'In spite of', 'Due to'],
    answer: 0,
    explanation: '"According to" = ตามที่ (อ้างอิงแหล่งข้อมูล). "Regardless of" = โดยไม่คำนึงถึง. "In spite of" = แม้ว่า. "Due to" = เนื่องจาก. บริบท "market survey" บ่งชี้การอ้างอิงแหล่งข้อมูล',
    tags: ['preposition', 'according-to', 'formal']
  },
  // 30 — Vocabulary (delegate)
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"delegate" = มอบหมายงาน/อำนาจให้ผู้อื่น เป็นทักษะการบริหารที่สำคัญ',
    question: 'Effective managers know when to ______ tasks to their team members rather than handling everything themselves.',
    choices: ['delegate', 'distribute', 'assign', 'transfer'],
    answer: 0,
    explanation: '"delegate" = มอบหมายงานพร้อมกับอำนาจในการตัดสินใจ. "distribute" = แจกจ่าย. "assign" = มอบหมาย (ทั่วไป). "transfer" = โอน. "delegate" เหมาะที่สุดในบริบทการบริหารจัดการ',
    tags: ['vocabulary', 'management', 'delegate', 'business']
  },
  // 31 — Conjunction (so that)
  {
    part: 5,
    category: 'Conjunction',
    level: 'intermediate',
    tip: '"so that" = เพื่อที่จะ แสดงวัตถุประสงค์ ตามด้วย can/could/will/would + base verb',
    question: 'Please send the invoice at least two weeks in advance ______ the accounts department can process the payment on time.',
    choices: ['so that', 'in order', 'because', 'although'],
    answer: 0,
    explanation: '"so that + subject + can/will + verb" = เพื่อที่จะ (แสดงวัตถุประสงค์). "in order" ต้องตามด้วย "to + verb". "because" = เพราะว่า (บอกเหตุผล ไม่ใช่วัตถุประสงค์)',
    tags: ['conjunction', 'so-that', 'purpose']
  },
  // 32 — Word Form (verb → noun)
  {
    part: 5,
    category: 'WordForm',
    level: 'intermediate',
    tip: '"assess" เป็น verb → "assessment" เป็น noun ตำแหน่งหลัง "conduct a" ต้องเป็น noun',
    question: 'The HR team will conduct a thorough ______ of all candidates before making a hiring decision.',
    choices: ['assess', 'assessed', 'assessment', 'assessing'],
    answer: 2,
    explanation: '"conduct a + noun" เป็นโครงสร้างที่ต้องการ noun. "assessment" = การประเมิน (noun). "assess" = verb, "assessed" = past participle, "assessing" = gerund/present participle',
    tags: ['word-form', 'noun', 'HR', 'assessment']
  },
  // 33 — Preposition (prior to)
  {
    part: 5,
    category: 'Preposition',
    level: 'advanced',
    tip: '"prior to" = ก่อน (ทางการมากกว่า "before") ใช้ในเอกสารทางธุรกิจและกฎหมาย',
    question: 'All employees must obtain written approval ______ taking any leave exceeding three days.',
    choices: ['prior to', 'instead of', 'regardless of', 'apart from'],
    answer: 0,
    explanation: '"prior to" = ก่อน (formal) ใช้แทน "before" ในบริบททางการ. "instead of" = แทนที่. "regardless of" = โดยไม่คำนึงถึง. "apart from" = นอกจาก',
    tags: ['preposition', 'prior-to', 'formal', 'advanced']
  },
  // 34 — Vocabulary (initiative)
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"initiative" ในบริบทธุรกิจ = โครงการริเริ่ม/แผนงานใหม่ ต่างจาก "initiative" แปลว่า ความคิดริเริ่ม',
    question: 'The company launched a new ______ to reduce its carbon footprint by 30% within five years.',
    choices: ['initiative', 'campaign', 'program', 'effort'],
    answer: 0,
    explanation: '"initiative" = แผนงานหรือโครงการที่ริเริ่มขึ้นเพื่อบรรลุเป้าหมายเฉพาะ เหมาะกับบริบทนโยบายองค์กร. "campaign" = การรณรงค์, "program" = โปรแกรม, "effort" = ความพยายาม',
    tags: ['vocabulary', 'business', 'initiative', 'corporate']
  },
  // 35 — Verb Tense (past perfect)
  {
    part: 5,
    category: 'Grammar',
    level: 'advanced',
    tip: 'Past Perfect (had + past participle) ใช้แสดงเหตุการณ์ที่เกิดขึ้นก่อนอีกเหตุการณ์หนึ่งในอดีต',
    question: 'By the time the investors arrived, the management team ______ all necessary documents.',
    choices: ['prepared', 'has prepared', 'had prepared', 'was preparing'],
    answer: 2,
    explanation: '"By the time + past simple" → ต้องใช้ Past Perfect ใน main clause. "had prepared" = เตรียมเสร็จก่อนที่นักลงทุนจะมาถึง. "has prepared" = Present Perfect ใช้กับปัจจุบัน ไม่เหมาะ',
    tags: ['grammar', 'past-perfect', 'verb-tense', 'advanced']
  },
  // 36 — Preposition (regardless of)
  {
    part: 5,
    category: 'Preposition',
    level: 'intermediate',
    tip: '"regardless of" = โดยไม่คำนึงถึง ใช้เมื่อบอกว่าสิ่งหนึ่งไม่ได้รับผลกระทบจากอีกสิ่งหนึ่ง',
    question: 'All team members will receive the same year-end bonus ______ their department\'s performance.',
    choices: ['regardless of', 'because of', 'according to', 'owing to'],
    answer: 0,
    explanation: '"regardless of" = โดยไม่คำนึงถึง = โบนัสเท่ากันทุกคน ไม่ว่าผลงานแผนกจะเป็นอย่างไร. "because of" = เพราะ. "according to" = ตาม. "owing to" = เนื่องจาก',
    tags: ['preposition', 'regardless-of', 'business']
  },
  // 37 — Vocabulary (negotiate)
  {
    part: 5,
    category: 'Vocabulary',
    level: 'intermediate',
    tip: '"negotiate" = เจรจาต่อรอง มักใช้กับ contract, terms, deal, price ใน TOEIC',
    question: 'Both parties agreed to ______ the terms of the contract before the deadline.',
    choices: ['negotiate', 'mediate', 'arbitrate', 'deliberate'],
    answer: 0,
    explanation: '"negotiate" = เจรจาต่อรองเพื่อให้ได้ข้อตกลง. "mediate" = ไกล่เกลี่ย (บุคคลที่สามช่วย). "arbitrate" = ตัดสินข้อพิพาท. "deliberate" = พิจารณาอย่างรอบคอบ',
    tags: ['vocabulary', 'business', 'negotiate', 'contract']
  },
  // 38 — Conjunction (as long as)
  {
    part: 5,
    category: 'Conjunction',
    level: 'intermediate',
    tip: '"as long as" = ตราบเท่าที่/โดยมีเงื่อนไขว่า ใช้แสดงเงื่อนไขที่ต้องปฏิบัติตลอดเวลา',
    question: 'Employees may work flexible hours ______ they complete their assigned tasks by the end of each week.',
    choices: ['as long as', 'even though', 'in case', 'so that'],
    answer: 0,
    explanation: '"as long as" = ตราบเท่าที่ (แสดงเงื่อนไข). "even though" = แม้ว่า (ขัดแย้ง). "in case" = เผื่อว่า (ป้องกันความเสี่ยง). "so that" = เพื่อที่จะ (วัตถุประสงค์)',
    tags: ['conjunction', 'as-long-as', 'conditional']
  },
  // 39 — Word Form (adj → adverb)
  {
    part: 5,
    category: 'WordForm',
    level: 'intermediate',
    tip: 'Adverb ขยาย verb. "speak" เป็น verb ต้องใช้ adverb ขยาย ไม่ใช่ adjective',
    question: 'The spokesperson spoke very ______ about the company\'s plans for expansion.',
    choices: ['confident', 'confidence', 'confidently', 'confide'],
    answer: 2,
    explanation: '"spoke" เป็น verb → ต้องขยายด้วย adverb. "confidently" = อย่างมั่นใจ (adverb). "confident" = adjective ขยาย noun. "confidence" = noun. "confide" = verb แปลว่า ไว้วางใจ/บอกความลับ',
    tags: ['word-form', 'adverb', 'verb-modification']
  },
  // 40 — Advanced Grammar (subjunctive)
  {
    part: 5,
    category: 'Grammar',
    level: 'advanced',
    tip: 'Subjunctive: หลัง "recommend/suggest/insist/require + that" ต้องใช้ base verb (ไม่มี -s, -ed, -ing) สำหรับทุก subject',
    question: 'The board recommended that the CEO ______ a third-party audit before the merger proceeds.',
    choices: ['conducts', 'conduct', 'conducted', 'conducting'],
    answer: 1,
    explanation: 'Subjunctive Mood: หลัง "recommend that + subject" ต้องใช้ base verb ไม่ว่า subject จะเป็นอะไร. "conduct" (base verb) ถูกต้อง ไม่ใช่ "conducts" (ซึ่งเป็น third person singular ของ indicative mood)',
    tags: ['grammar', 'subjunctive', 'advanced', 'recommend']
  },

  // ─── PART 6 — Text Completion ────────────────────────────────────────────────
  // Passage 1: Annual Conference Email (Q41–44)
  // 41
  {
    part: 6,
    category: 'TextCompletion',
    level: 'intermediate',
    tip: 'เลือก transition word ที่เหมาะกับบริบท: "Nonetheless" = อย่างไรก็ตาม ใช้เมื่อมีการเปลี่ยนแปลงที่ต้องแจ้ง',
    passage: 'Subject: Annual Sales Conference — Important Updates\n\nDear All Sales Representatives,\n\nI am writing to inform you about some important changes to our upcoming Annual Sales Conference scheduled for next month. (Q1) ______, we will be moving the venue from the Grand Hotel to the Riverside Convention Center due to unexpected renovations at the original location.\n\nPlease note that the conference will still begin at 9:00 A.M. on both days. However, registration will now open at 8:00 A.M. to accommodate the larger number of attendees this year. All participants are (Q2) ______ to bring their employee ID cards for verification purposes.\n\nThe keynote speaker, Dr. Michael Chang, will present his insights on emerging market trends. His presentation is (Q3) ______ to last approximately two hours, including a Q&A session.\n\nIf you have any questions regarding travel arrangements or accommodations, please contact the event coordinator, Ms. Sarah Lee, (Q4) ______ extension 4521.\n\nBest regards,\nThomas Wright\nDirector of Sales',
    question: 'Which word best fills blank (Q1) to introduce an unexpected change?',
    choices: ['Nonetheless', 'Fortunately', 'Furthermore', 'Therefore'],
    answer: 0,
    explanation: '"Nonetheless" = อย่างไรก็ตาม ใช้เมื่อมีข้อมูลสำคัญที่ขัดแย้งหรือเปลี่ยนแปลงจากสิ่งที่กล่าวก่อนหน้า. "Fortunately" = โชคดี. "Furthermore" = นอกจากนี้ (เพิ่มข้อมูล). "Therefore" = ดังนั้น (ผล)',
    tags: ['text-completion', 'transition', 'nonetheless', 'email']
  },
  // 42
  {
    part: 6,
    category: 'TextCompletion',
    level: 'intermediate',
    tip: '"required to" = บังคับต้อง ใช้ในบริบทที่มีกฎข้อบังคับ',
    passage: 'Subject: Annual Sales Conference — Important Updates\n\nDear All Sales Representatives,\n\nI am writing to inform you about some important changes to our upcoming Annual Sales Conference scheduled for next month. (Q1) ______, we will be moving the venue from the Grand Hotel to the Riverside Convention Center due to unexpected renovations at the original location.\n\nPlease note that the conference will still begin at 9:00 A.M. on both days. However, registration will now open at 8:00 A.M. to accommodate the larger number of attendees this year. All participants are (Q2) ______ to bring their employee ID cards for verification purposes.\n\nThe keynote speaker, Dr. Michael Chang, will present his insights on emerging market trends. His presentation is (Q3) ______ to last approximately two hours, including a Q&A session.\n\nIf you have any questions regarding travel arrangements or accommodations, please contact the event coordinator, Ms. Sarah Lee, (Q4) ______ extension 4521.\n\nBest regards,\nThomas Wright\nDirector of Sales',
    question: 'Which word best fills blank (Q2) to indicate that participants must bring their ID cards?',
    choices: ['required', 'suggested', 'allowed', 'expected'],
    answer: 0,
    explanation: '"required to" = บังคับต้องทำ เหมาะกับ "for verification purposes". "suggested" = แนะนำ (ไม่บังคับ). "allowed" = อนุญาต. "expected" = คาดหวัง แต่ไม่บังคับเท่า "required"',
    tags: ['text-completion', 'vocabulary', 'required', 'formal']
  },
  // 43
  {
    part: 6,
    category: 'TextCompletion',
    level: 'intermediate',
    tip: '"scheduled to" = กำหนดไว้ว่าจะ ใช้กับกำหนดการหรือแผนที่วางไว้',
    passage: 'Subject: Annual Sales Conference — Important Updates\n\nDear All Sales Representatives,\n\nI am writing to inform you about some important changes to our upcoming Annual Sales Conference scheduled for next month. (Q1) ______, we will be moving the venue from the Grand Hotel to the Riverside Convention Center due to unexpected renovations at the original location.\n\nPlease note that the conference will still begin at 9:00 A.M. on both days. However, registration will now open at 8:00 A.M. to accommodate the larger number of attendees this year. All participants are (Q2) ______ to bring their employee ID cards for verification purposes.\n\nThe keynote speaker, Dr. Michael Chang, will present his insights on emerging market trends. His presentation is (Q3) ______ to last approximately two hours, including a Q&A session.\n\nIf you have any questions regarding travel arrangements or accommodations, please contact the event coordinator, Ms. Sarah Lee, (Q4) ______ extension 4521.\n\nBest regards,\nThomas Wright\nDirector of Sales',
    question: 'Which word best fills blank (Q3) to describe the planned duration of the presentation?',
    choices: ['scheduled', 'forced', 'supposed', 'intended'],
    answer: 0,
    explanation: '"scheduled to last" = กำหนดไว้ว่าจะใช้เวลา เหมาะกับบริบทกำหนดการประชุม. "forced" = บังคับ (ความหมายเชิงลบ). "supposed to" ถูกต้องในภาษาพูด แต่ "scheduled" เป็นทางการกว่า. "intended" = ตั้งใจ (ใช้ได้แต่ "scheduled" เหมาะกว่า)',
    tags: ['text-completion', 'vocabulary', 'scheduled', 'conference']
  },
  // 44
  {
    part: 6,
    category: 'TextCompletion',
    level: 'intermediate',
    tip: '"at extension" = ที่เบอร์ต่อ เป็น collocation มาตรฐานในการสื่อสารทางธุรกิจ',
    passage: 'Subject: Annual Sales Conference — Important Updates\n\nDear All Sales Representatives,\n\nI am writing to inform you about some important changes to our upcoming Annual Sales Conference scheduled for next month. (Q1) ______, we will be moving the venue from the Grand Hotel to the Riverside Convention Center due to unexpected renovations at the original location.\n\nPlease note that the conference will still begin at 9:00 A.M. on both days. However, registration will now open at 8:00 A.M. to accommodate the larger number of attendees this year. All participants are (Q2) ______ to bring their employee ID cards for verification purposes.\n\nThe keynote speaker, Dr. Michael Chang, will present his insights on emerging market trends. His presentation is (Q3) ______ to last approximately two hours, including a Q&A session.\n\nIf you have any questions regarding travel arrangements or accommodations, please contact the event coordinator, Ms. Sarah Lee, (Q4) ______ extension 4521.\n\nBest regards,\nThomas Wright\nDirector of Sales',
    question: 'Which preposition best fills blank (Q4) before "extension 4521"?',
    choices: ['at', 'on', 'by', 'through'],
    answer: 0,
    explanation: '"at extension 4521" = ที่เบอร์ต่อ 4521 เป็น fixed collocation ในภาษาอังกฤษธุรกิจ. "on extension" ใช้ได้ในบางบริบท แต่ "at" เป็นมาตรฐานมากกว่าใน TOEIC. "by" และ "through" ไม่ถูกต้อง',
    tags: ['text-completion', 'preposition', 'at-extension', 'business']
  },

  // Passage 2: Remote Work Policy Memo (Q45–48)
  // 45
  {
    part: 6,
    category: 'TextCompletion',
    level: 'intermediate',
    tip: '"provided that" = โดยมีเงื่อนไขว่า ใช้แสดงเงื่อนไขในเอกสารทางการ',
    passage: 'MEMORANDUM\n\nTO: All Department Heads\nFROM: Human Resources Department\nRE: Updated Remote Work Policy\nDATE: March 15, 2026\n\nEffective April 1, 2026, the company will implement a new hybrid work policy. Under this policy, employees may work remotely for up to three days per week, (Q1) ______ they maintain their productivity targets and attend all required in-person meetings.\n\nManagers are responsible for (Q2) ______ their teams\' work schedules and ensuring adequate office coverage at all times. Each department must have at least 40% of its staff present in the office on any given workday.\n\nEmployees who wish to participate in the remote work program must submit a formal request to their direct supervisor. (Q3) ______ will be evaluated based on the employee\'s performance record and the nature of their job responsibilities.\n\nThe HR department will host information sessions next week to address any concerns. Attendance is strongly (Q4) ______ for all managers and team leaders.\n\nPlease direct any inquiries to hr@company.com.',
    question: 'Which phrase best fills blank (Q1) to introduce a condition for remote work?',
    choices: ['provided that', 'even if', 'so that', 'in case'],
    answer: 0,
    explanation: '"provided that" = โดยมีเงื่อนไขว่า (formal conditional) เหมาะกับบริบทนโยบายบริษัท. "even if" = แม้ว่า (ไม่ใช่เงื่อนไข). "so that" = เพื่อที่จะ (วัตถุประสงค์). "in case" = เผื่อว่า',
    tags: ['text-completion', 'conjunction', 'provided-that', 'policy']
  },
  // 46
  {
    part: 6,
    category: 'TextCompletion',
    level: 'intermediate',
    tip: '"monitor" = ติดตาม/ตรวจสอบ ใช้กับ schedule, performance, progress',
    passage: 'MEMORANDUM\n\nTO: All Department Heads\nFROM: Human Resources Department\nRE: Updated Remote Work Policy\nDATE: March 15, 2026\n\nEffective April 1, 2026, the company will implement a new hybrid work policy. Under this policy, employees may work remotely for up to three days per week, (Q1) ______ they maintain their productivity targets and attend all required in-person meetings.\n\nManagers are responsible for (Q2) ______ their teams\' work schedules and ensuring adequate office coverage at all times. Each department must have at least 40% of its staff present in the office on any given workday.\n\nEmployees who wish to participate in the remote work program must submit a formal request to their direct supervisor. (Q3) ______ will be evaluated based on the employee\'s performance record and the nature of their job responsibilities.\n\nThe HR department will host information sessions next week to address any concerns. Attendance is strongly (Q4) ______ for all managers and team leaders.\n\nPlease direct any inquiries to hr@company.com.',
    question: 'Which word best fills blank (Q2) to describe managers overseeing schedules?',
    choices: ['coordinating', 'monitoring', 'organizing', 'supervising'],
    answer: 1,
    explanation: '"monitoring" = ติดตามตรวจสอบ (ดู performance ต่อเนื่อง) เหมาะกับ "work schedules". "coordinating" = ประสานงาน. "organizing" = จัดระเบียบ. "supervising" = ดูแล (ใกล้เคียง แต่ "monitoring" เน้นการติดตามมากกว่า)',
    tags: ['text-completion', 'vocabulary', 'monitoring', 'management']
  },
  // 47
  {
    part: 6,
    category: 'TextCompletion',
    level: 'intermediate',
    tip: 'เลือก noun ที่ตรงกับ context: "submit a formal request" → ประโยคถัดไปต้องอ้างถึง "requests" ที่ยื่นมา',
    passage: 'MEMORANDUM\n\nTO: All Department Heads\nFROM: Human Resources Department\nRE: Updated Remote Work Policy\nDATE: March 15, 2026\n\nEffective April 1, 2026, the company will implement a new hybrid work policy. Under this policy, employees may work remotely for up to three days per week, (Q1) ______ they maintain their productivity targets and attend all required in-person meetings.\n\nManagers are responsible for (Q2) ______ their teams\' work schedules and ensuring adequate office coverage at all times. Each department must have at least 40% of its staff present in the office on any given workday.\n\nEmployees who wish to participate in the remote work program must submit a formal request to their direct supervisor. (Q3) ______ will be evaluated based on the employee\'s performance record and the nature of their job responsibilities.\n\nThe HR department will host information sessions next week to address any concerns. Attendance is strongly (Q4) ______ for all managers and team leaders.\n\nPlease direct any inquiries to hr@company.com.',
    question: 'Which word best fills blank (Q3) as the subject referring to what was submitted?',
    choices: ['Requests', 'Applications', 'Proposals', 'Submissions'],
    answer: 0,
    explanation: 'ประโยคก่อนหน้าใช้คำว่า "submit a formal request" ดังนั้น (Q3) ควรเป็น "Requests" เพื่อรักษา consistency. "Applications" = ใบสมัคร (ต่างบริบท). "Proposals" = ข้อเสนอโครงการ. "Submissions" = สิ่งที่ส่ง (กว้างเกินไป)',
    tags: ['text-completion', 'noun', 'pronoun-reference', 'policy']
  },
  // 48
  {
    part: 6,
    category: 'TextCompletion',
    level: 'intermediate',
    tip: '"encouraged" = แนะนำอย่างยิ่ง (ไม่บังคับแต่ต้องการให้ทำ) ต่างจาก "required" ที่บังคับ',
    passage: 'MEMORANDUM\n\nTO: All Department Heads\nFROM: Human Resources Department\nRE: Updated Remote Work Policy\nDATE: March 15, 2026\n\nEffective April 1, 2026, the company will implement a new hybrid work policy. Under this policy, employees may work remotely for up to three days per week, (Q1) ______ they maintain their productivity targets and attend all required in-person meetings.\n\nManagers are responsible for (Q2) ______ their teams\' work schedules and ensuring adequate office coverage at all times. Each department must have at least 40% of its staff present in the office on any given workday.\n\nEmployees who wish to participate in the remote work program must submit a formal request to their direct supervisor. (Q3) ______ will be evaluated based on the employee\'s performance record and the nature of their job responsibilities.\n\nThe HR department will host information sessions next week to address any concerns. Attendance is strongly (Q4) ______ for all managers and team leaders.\n\nPlease direct any inquiries to hr@company.com.',
    question: 'Which word best fills blank (Q4) to indicate that attendance is strongly advised but not mandatory?',
    choices: ['recommended', 'encouraged', 'suggested', 'advised'],
    answer: 1,
    explanation: '"strongly encouraged" = แนะนำอย่างยิ่ง เป็น collocation มาตรฐานในเอกสาร HR. "strongly recommended" ก็ใช้ได้ แต่ "encouraged" เน้นการกระตุ้นให้เข้าร่วมมากกว่า. "suggested/advised" ฟังดูไม่เป็นทางการพอ',
    tags: ['text-completion', 'vocabulary', 'encouraged', 'HR']
  },

  // ─── PART 7 — Reading Comprehension ─────────────────────────────────────────
  // Passage 1: Job Advertisement — TechVision Solutions (Q49–53)
  // 49
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'อ่าน passage หาคำสำคัญที่ระบุประเภทของบริษัท มักอยู่ในย่อหน้าแรก',
    passage: 'POSITION: Senior Marketing Manager\nCOMPANY: TechVision Solutions\nLOCATION: Bangkok, Thailand\n\nTechVision Solutions, a leading technology company specializing in AI-driven marketing tools, is seeking an experienced Senior Marketing Manager to join our dynamic team.\n\nRESPONSIBILITIES:\n• Develop and execute comprehensive marketing strategies\n• Lead a team of 8-10 marketing professionals\n• Manage an annual marketing budget of $2 million\n• Collaborate with product development teams to launch new features\n• Analyze market trends and competitor activities\n\nQUALIFICATIONS:\n• Bachelor\'s degree in Marketing, Business, or related field (MBA preferred)\n• Minimum 7 years of marketing experience, with at least 3 years in a senior role\n• Proven track record in digital marketing and brand management\n• Excellent communication skills in English and Thai\n• Experience with marketing automation tools (HubSpot, Salesforce preferred)\n\nCOMPENSATION:\n• Competitive salary: 120,000-150,000 THB per month\n• Annual performance bonus\n• Health insurance and dental coverage\n• Professional development allowance: 30,000 THB per year\n\nTo apply, send your resume and cover letter to careers@techvision.co.th by April 30, 2026.',
    question: 'What type of company is TechVision Solutions?',
    choices: ['A marketing agency', 'A technology company', 'A recruitment firm', 'A financial institution'],
    answer: 1,
    explanation: 'passage ระบุชัดเจนว่า "a leading technology company specializing in AI-driven marketing tools" ดังนั้นคำตอบคือ "A technology company". แม้จะทำ marketing tools แต่ไม่ใช่ marketing agency',
    tags: ['reading', 'comprehension', 'job-advertisement', 'detail']
  },
  // 50
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'ระวังความแตกต่างระหว่าง "total years" กับ "years in a senior role" ใน QUALIFICATIONS',
    passage: 'POSITION: Senior Marketing Manager\nCOMPANY: TechVision Solutions\nLOCATION: Bangkok, Thailand\n\nTechVision Solutions, a leading technology company specializing in AI-driven marketing tools, is seeking an experienced Senior Marketing Manager to join our dynamic team.\n\nRESPONSIBILITIES:\n• Develop and execute comprehensive marketing strategies\n• Lead a team of 8-10 marketing professionals\n• Manage an annual marketing budget of $2 million\n• Collaborate with product development teams to launch new features\n• Analyze market trends and competitor activities\n\nQUALIFICATIONS:\n• Bachelor\'s degree in Marketing, Business, or related field (MBA preferred)\n• Minimum 7 years of marketing experience, with at least 3 years in a senior role\n• Proven track record in digital marketing and brand management\n• Excellent communication skills in English and Thai\n• Experience with marketing automation tools (HubSpot, Salesforce preferred)\n\nCOMPENSATION:\n• Competitive salary: 120,000-150,000 THB per month\n• Annual performance bonus\n• Health insurance and dental coverage\n• Professional development allowance: 30,000 THB per year\n\nTo apply, send your resume and cover letter to careers@techvision.co.th by April 30, 2026.',
    question: 'How many years of marketing experience is required for this position?',
    choices: ['At least 3 years', 'At least 5 years', 'At least 7 years', 'At least 10 years'],
    answer: 2,
    explanation: 'passage ระบุ "Minimum 7 years of marketing experience, with at least 3 years in a senior role" ตัวเลือก A (3 years) เป็นเฉพาะ senior role ไม่ใช่ total experience. คำตอบที่ถูกต้องคือ C — At least 7 years',
    tags: ['reading', 'comprehension', 'detail', 'qualifications']
  },
  // 51
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'อ่าน RESPONSIBILITIES ทุกข้อแล้วเปรียบเทียบกับตัวเลือก อย่าเลือกตามที่คิดว่าน่าจะใช่',
    passage: 'POSITION: Senior Marketing Manager\nCOMPANY: TechVision Solutions\nLOCATION: Bangkok, Thailand\n\nTechVision Solutions, a leading technology company specializing in AI-driven marketing tools, is seeking an experienced Senior Marketing Manager to join our dynamic team.\n\nRESPONSIBILITIES:\n• Develop and execute comprehensive marketing strategies\n• Lead a team of 8-10 marketing professionals\n• Manage an annual marketing budget of $2 million\n• Collaborate with product development teams to launch new features\n• Analyze market trends and competitor activities\n\nQUALIFICATIONS:\n• Bachelor\'s degree in Marketing, Business, or related field (MBA preferred)\n• Minimum 7 years of marketing experience, with at least 3 years in a senior role\n• Proven track record in digital marketing and brand management\n• Excellent communication skills in English and Thai\n• Experience with marketing automation tools (HubSpot, Salesforce preferred)\n\nCOMPENSATION:\n• Competitive salary: 120,000-150,000 THB per month\n• Annual performance bonus\n• Health insurance and dental coverage\n• Professional development allowance: 30,000 THB per year\n\nTo apply, send your resume and cover letter to careers@techvision.co.th by April 30, 2026.',
    question: 'Which of the following is listed as a responsibility?',
    choices: ['Recruiting new employees', 'Managing a team of professionals', 'Developing new AI products', 'Conducting salary reviews'],
    answer: 1,
    explanation: '"Lead a team of 8-10 marketing professionals" ตรงกับ "Managing a team of professionals". A (Recruiting) ไม่ระบุ. C (AI products) — บริษัทมี AI tools แต่ความรับผิดชอบคือ launch features ไม่ใช่ develop AI. D ไม่ระบุ',
    tags: ['reading', 'comprehension', 'responsibilities', 'inference']
  },
  // 52
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'อ่าน COMPENSATION section ให้ครบ ระวังสับสนระหว่างประเภทของ benefits',
    passage: 'POSITION: Senior Marketing Manager\nCOMPANY: TechVision Solutions\nLOCATION: Bangkok, Thailand\n\nTechVision Solutions, a leading technology company specializing in AI-driven marketing tools, is seeking an experienced Senior Marketing Manager to join our dynamic team.\n\nRESPONSIBILITIES:\n• Develop and execute comprehensive marketing strategies\n• Lead a team of 8-10 marketing professionals\n• Manage an annual marketing budget of $2 million\n• Collaborate with product development teams to launch new features\n• Analyze market trends and competitor activities\n\nQUALIFICATIONS:\n• Bachelor\'s degree in Marketing, Business, or related field (MBA preferred)\n• Minimum 7 years of marketing experience, with at least 3 years in a senior role\n• Proven track record in digital marketing and brand management\n• Excellent communication skills in English and Thai\n• Experience with marketing automation tools (HubSpot, Salesforce preferred)\n\nCOMPENSATION:\n• Competitive salary: 120,000-150,000 THB per month\n• Annual performance bonus\n• Health insurance and dental coverage\n• Professional development allowance: 30,000 THB per year\n\nTo apply, send your resume and cover letter to careers@techvision.co.th by April 30, 2026.',
    question: 'What does the job offer for professional development?',
    choices: ['Free MBA program', 'Monthly training sessions', '30,000 THB annual allowance', 'Overseas training opportunities'],
    answer: 2,
    explanation: '"Professional development allowance: 30,000 THB per year" ตรงกับตัวเลือก C. A (MBA) — passage ระบุ MBA preferred เป็น qualification ไม่ใช่ benefit. B และ D ไม่ระบุใน passage',
    tags: ['reading', 'comprehension', 'compensation', 'detail']
  },
  // 53
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'อ่านหา deadline ใน passage โดยตรง มักอยู่ในส่วนท้าย',
    passage: 'POSITION: Senior Marketing Manager\nCOMPANY: TechVision Solutions\nLOCATION: Bangkok, Thailand\n\nTechVision Solutions, a leading technology company specializing in AI-driven marketing tools, is seeking an experienced Senior Marketing Manager to join our dynamic team.\n\nRESPONSIBILITIES:\n• Develop and execute comprehensive marketing strategies\n• Lead a team of 8-10 marketing professionals\n• Manage an annual marketing budget of $2 million\n• Collaborate with product development teams to launch new features\n• Analyze market trends and competitor activities\n\nQUALIFICATIONS:\n• Bachelor\'s degree in Marketing, Business, or related field (MBA preferred)\n• Minimum 7 years of marketing experience, with at least 3 years in a senior role\n• Proven track record in digital marketing and brand management\n• Excellent communication skills in English and Thai\n• Experience with marketing automation tools (HubSpot, Salesforce preferred)\n\nCOMPENSATION:\n• Competitive salary: 120,000-150,000 THB per month\n• Annual performance bonus\n• Health insurance and dental coverage\n• Professional development allowance: 30,000 THB per year\n\nTo apply, send your resume and cover letter to careers@techvision.co.th by April 30, 2026.',
    question: 'By what date must applications be submitted?',
    choices: ['March 30', 'April 1', 'April 15', 'April 30'],
    answer: 3,
    explanation: 'passage ระบุ "send your resume and cover letter to careers@techvision.co.th by April 30, 2026" ดังนั้น deadline คือ April 30',
    tags: ['reading', 'comprehension', 'deadline', 'detail']
  },

  // Passage 2: Complaint + Response Letters — HomeComfort (Q54–58)
  // 54
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'Main purpose ของจดหมาย ดูจากย่อหน้าแรกที่ระบุเหตุผลในการเขียน',
    passage: 'March 10, 2026\n\nCustomer Service Department\nHomeComfort Appliances\n123 Industrial Road\nSingapore 456789\n\nDear Customer Service Team,\n\nI am writing to express my dissatisfaction with a refrigerator (Model HC-500) I purchased from your authorized dealer in Bangkok on February 1, 2026. The invoice number is INV-2026-0892.\n\nAfter only five weeks of use, the refrigerator stopped cooling properly. Despite adjusting the temperature settings as instructed in the manual, the problem persists. Food stored inside has spoiled twice already, causing both financial loss and inconvenience.\n\nI contacted the dealer on March 5, but was told that repairs could take up to three weeks. This is unacceptable given that the appliance is barely two months old and should still be under the one-year manufacturer\'s warranty.\n\nI request either an immediate repair within one week or a full replacement unit. I would also appreciate compensation for the spoiled food items, totaling approximately 2,500 THB.\n\nI look forward to your prompt response.\n\nSincerely,\nApinya Charoenwong\n\n---\n\nMarch 14, 2026\n\nDear Ms. Charoenwong,\n\nThank you for contacting HomeComfort Appliances regarding your HC-500 refrigerator. We sincerely apologize for the inconvenience you have experienced.\n\nUpon reviewing your case, we have arranged for one of our certified technicians to visit your home on March 18 between 9 A.M. and 12 P.M. to assess and repair the unit. If the repair cannot be completed on that day, we will provide a replacement refrigerator within 48 hours at no additional cost.\n\nRegarding your request for food spoilage compensation, we are pleased to offer a 3,000 THB credit toward your next purchase at any of our authorized retailers. Alternatively, you may request a direct refund of 2,500 THB, which will be processed within 5-7 business days.\n\nWe value your loyalty and assure you that this situation does not reflect our commitment to quality and customer satisfaction.\n\nPlease confirm your preferred compensation option by replying to this email.\n\nBest regards,\nJames Lim\nCustomer Relations Manager\nHomeComfort Appliances',
    question: 'What is the main purpose of the first letter?',
    choices: ['To request a refund for a purchase', 'To report a problem with an appliance', 'To inquire about warranty terms', 'To cancel a product order'],
    answer: 1,
    explanation: 'จดหมายฉบับแรกระบุว่า "I am writing to express my dissatisfaction with a refrigerator" และ "the refrigerator stopped cooling properly" → วัตถุประสงค์หลักคือรายงานปัญหาเครื่องใช้ไฟฟ้า (report a problem with an appliance)',
    tags: ['reading', 'main-purpose', 'complaint', 'letter']
  },
  // 55
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'ระวังตัวเลขวันที่หลายตัวใน passage — อ่านให้ครบก่อนตอบ',
    passage: 'March 10, 2026\n\nCustomer Service Department\nHomeComfort Appliances\n123 Industrial Road\nSingapore 456789\n\nDear Customer Service Team,\n\nI am writing to express my dissatisfaction with a refrigerator (Model HC-500) I purchased from your authorized dealer in Bangkok on February 1, 2026. The invoice number is INV-2026-0892.\n\nAfter only five weeks of use, the refrigerator stopped cooling properly. Despite adjusting the temperature settings as instructed in the manual, the problem persists. Food stored inside has spoiled twice already, causing both financial loss and inconvenience.\n\nI contacted the dealer on March 5, but was told that repairs could take up to three weeks. This is unacceptable given that the appliance is barely two months old and should still be under the one-year manufacturer\'s warranty.\n\nI request either an immediate repair within one week or a full replacement unit. I would also appreciate compensation for the spoiled food items, totaling approximately 2,500 THB.\n\nI look forward to your prompt response.\n\nSincerely,\nApinya Charoenwong\n\n---\n\nMarch 14, 2026\n\nDear Ms. Charoenwong,\n\nThank you for contacting HomeComfort Appliances regarding your HC-500 refrigerator. We sincerely apologize for the inconvenience you have experienced.\n\nUpon reviewing your case, we have arranged for one of our certified technicians to visit your home on March 18 between 9 A.M. and 12 P.M. to assess and repair the unit. If the repair cannot be completed on that day, we will provide a replacement refrigerator within 48 hours at no additional cost.\n\nRegarding your request for food spoilage compensation, we are pleased to offer a 3,000 THB credit toward your next purchase at any of our authorized retailers. Alternatively, you may request a direct refund of 2,500 THB, which will be processed within 5-7 business days.\n\nWe value your loyalty and assure you that this situation does not reflect our commitment to quality and customer satisfaction.\n\nPlease confirm your preferred compensation option by replying to this email.\n\nBest regards,\nJames Lim\nCustomer Relations Manager\nHomeComfort Appliances',
    question: 'When did Ms. Charoenwong purchase the refrigerator?',
    choices: ['March 5', 'March 10', 'February 1', 'January 2026'],
    answer: 2,
    explanation: 'passage ระบุ "a refrigerator I purchased from your authorized dealer in Bangkok on February 1, 2026". March 5 = วันที่ติดต่อ dealer, March 10 = วันที่เขียนจดหมาย, January ไม่ระบุ',
    tags: ['reading', 'detail', 'date', 'complaint']
  },
  // 56
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'คำถาม "What does X request?" ให้หาทุกสิ่งที่ผู้เขียนร้องขอ ไม่ใช่แค่สิ่งแรก',
    passage: 'March 10, 2026\n\nCustomer Service Department\nHomeComfort Appliances\n123 Industrial Road\nSingapore 456789\n\nDear Customer Service Team,\n\nI am writing to express my dissatisfaction with a refrigerator (Model HC-500) I purchased from your authorized dealer in Bangkok on February 1, 2026. The invoice number is INV-2026-0892.\n\nAfter only five weeks of use, the refrigerator stopped cooling properly. Despite adjusting the temperature settings as instructed in the manual, the problem persists. Food stored inside has spoiled twice already, causing both financial loss and inconvenience.\n\nI contacted the dealer on March 5, but was told that repairs could take up to three weeks. This is unacceptable given that the appliance is barely two months old and should still be under the one-year manufacturer\'s warranty.\n\nI request either an immediate repair within one week or a full replacement unit. I would also appreciate compensation for the spoiled food items, totaling approximately 2,500 THB.\n\nI look forward to your prompt response.\n\nSincerely,\nApinya Charoenwong\n\n---\n\nMarch 14, 2026\n\nDear Ms. Charoenwong,\n\nThank you for contacting HomeComfort Appliances regarding your HC-500 refrigerator. We sincerely apologize for the inconvenience you have experienced.\n\nUpon reviewing your case, we have arranged for one of our certified technicians to visit your home on March 18 between 9 A.M. and 12 P.M. to assess and repair the unit. If the repair cannot be completed on that day, we will provide a replacement refrigerator within 48 hours at no additional cost.\n\nRegarding your request for food spoilage compensation, we are pleased to offer a 3,000 THB credit toward your next purchase at any of our authorized retailers. Alternatively, you may request a direct refund of 2,500 THB, which will be processed within 5-7 business days.\n\nWe value your loyalty and assure you that this situation does not reflect our commitment to quality and customer satisfaction.\n\nPlease confirm your preferred compensation option by replying to this email.\n\nBest regards,\nJames Lim\nCustomer Relations Manager\nHomeComfort Appliances',
    question: 'What does Ms. Charoenwong request in her letter?',
    choices: ['A full refund of the purchase price', 'A repair or replacement and food compensation', 'A new warranty extension', 'An immediate home visit'],
    answer: 1,
    explanation: '"I request either an immediate repair within one week or a full replacement unit. I would also appreciate compensation for the spoiled food items" → ขอ repair หรือ replacement + compensation for food. ตัวเลือก B ครอบคลุมทั้งสองส่วน',
    tags: ['reading', 'detail', 'request', 'complaint']
  },
  // 57
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'อ่านเงื่อนไขใน response letter: "If the repair cannot be completed..."',
    passage: 'March 10, 2026\n\nCustomer Service Department\nHomeComfort Appliances\n123 Industrial Road\nSingapore 456789\n\nDear Customer Service Team,\n\nI am writing to express my dissatisfaction with a refrigerator (Model HC-500) I purchased from your authorized dealer in Bangkok on February 1, 2026. The invoice number is INV-2026-0892.\n\nAfter only five weeks of use, the refrigerator stopped cooling properly. Despite adjusting the temperature settings as instructed in the manual, the problem persists. Food stored inside has spoiled twice already, causing both financial loss and inconvenience.\n\nI contacted the dealer on March 5, but was told that repairs could take up to three weeks. This is unacceptable given that the appliance is barely two months old and should still be under the one-year manufacturer\'s warranty.\n\nI request either an immediate repair within one week or a full replacement unit. I would also appreciate compensation for the spoiled food items, totaling approximately 2,500 THB.\n\nI look forward to your prompt response.\n\nSincerely,\nApinya Charoenwong\n\n---\n\nMarch 14, 2026\n\nDear Ms. Charoenwong,\n\nThank you for contacting HomeComfort Appliances regarding your HC-500 refrigerator. We sincerely apologize for the inconvenience you have experienced.\n\nUpon reviewing your case, we have arranged for one of our certified technicians to visit your home on March 18 between 9 A.M. and 12 P.M. to assess and repair the unit. If the repair cannot be completed on that day, we will provide a replacement refrigerator within 48 hours at no additional cost.\n\nRegarding your request for food spoilage compensation, we are pleased to offer a 3,000 THB credit toward your next purchase at any of our authorized retailers. Alternatively, you may request a direct refund of 2,500 THB, which will be processed within 5-7 business days.\n\nWe value your loyalty and assure you that this situation does not reflect our commitment to quality and customer satisfaction.\n\nPlease confirm your preferred compensation option by replying to this email.\n\nBest regards,\nJames Lim\nCustomer Relations Manager\nHomeComfort Appliances',
    question: 'What will happen if the technician cannot fix the refrigerator on March 18?',
    choices: ['A refund will be issued', 'A replacement will be provided within 48 hours', 'Another appointment will be scheduled', 'The dealer will handle the matter'],
    answer: 1,
    explanation: '"If the repair cannot be completed on that day, we will provide a replacement refrigerator within 48 hours at no additional cost" → ตรงกับตัวเลือก B. ไม่มีการกล่าวถึง refund, rescheduling, หรือ dealer ในบริบทนี้',
    tags: ['reading', 'detail', 'conditional', 'response']
  },
  // 58
  {
    part: 7,
    category: 'Reading',
    level: 'intermediate',
    tip: 'ระวัง: บริษัทเสนอ 3,000 THB credit หรือ 2,500 THB direct refund — อ่านให้ชัดว่าถามอะไร',
    passage: 'March 10, 2026\n\nCustomer Service Department\nHomeComfort Appliances\n123 Industrial Road\nSingapore 456789\n\nDear Customer Service Team,\n\nI am writing to express my dissatisfaction with a refrigerator (Model HC-500) I purchased from your authorized dealer in Bangkok on February 1, 2026. The invoice number is INV-2026-0892.\n\nAfter only five weeks of use, the refrigerator stopped cooling properly. Despite adjusting the temperature settings as instructed in the manual, the problem persists. Food stored inside has spoiled twice already, causing both financial loss and inconvenience.\n\nI contacted the dealer on March 5, but was told that repairs could take up to three weeks. This is unacceptable given that the appliance is barely two months old and should still be under the one-year manufacturer\'s warranty.\n\nI request either an immediate repair within one week or a full replacement unit. I would also appreciate compensation for the spoiled food items, totaling approximately 2,500 THB.\n\nI look forward to your prompt response.\n\nSincerely,\nApinya Charoenwong\n\n---\n\nMarch 14, 2026\n\nDear Ms. Charoenwong,\n\nThank you for contacting HomeComfort Appliances regarding your HC-500 refrigerator. We sincerely apologize for the inconvenience you have experienced.\n\nUpon reviewing your case, we have arranged for one of our certified technicians to visit your home on March 18 between 9 A.M. and 12 P.M. to assess and repair the unit. If the repair cannot be completed on that day, we will provide a replacement refrigerator within 48 hours at no additional cost.\n\nRegarding your request for food spoilage compensation, we are pleased to offer a 3,000 THB credit toward your next purchase at any of our authorized retailers. Alternatively, you may request a direct refund of 2,500 THB, which will be processed within 5-7 business days.\n\nWe value your loyalty and assure you that this situation does not reflect our commitment to quality and customer satisfaction.\n\nPlease confirm your preferred compensation option by replying to this email.\n\nBest regards,\nJames Lim\nCustomer Relations Manager\nHomeComfort Appliances',
    question: 'How much food compensation does the company offer as a direct refund?',
    choices: ['2,000 THB', '2,500 THB', '3,000 THB', '3,500 THB'],
    answer: 1,
    explanation: '"you may request a direct refund of 2,500 THB" → ตอบ B. ระวังสับสนกับ 3,000 THB ซึ่งเป็น store credit ไม่ใช่ direct refund. คำถามถามเฉพาะ "direct refund"',
    tags: ['reading', 'detail', 'compensation', 'numbers']
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://toeicup-mongo:27017/toeicup');
    console.log('Connected to MongoDB');
    await Question.deleteMany({});
    console.log('Cleared all existing questions');
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
