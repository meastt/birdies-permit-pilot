
import { Question, Difficulty, Milestone } from './types';

export const UTAH_QUESTIONS: Question[] = [
  // SECTION 3 - OFFICIAL SAMPLE
  {
    id: 's3q1',
    text: "If you are 19 years of age or older and never had a driver license, do you have to take a driver education course?",
    options: ["Yes, always", "No, but you must hold a permit for 90 days", "No, but you must pass a skills test only", "Only if you are under 21"],
    correctIndex: 1,
    difficulty: Difficulty.WARMUP,
    category: "Driver Education",
    handbookRef: "Page 113, Section 3"
  },
  {
    id: 's3q2',
    text: "If you are 17 years of age or younger, how long must you hold a learner permit before applying for a license?",
    options: ["3 months", "6 months", "9 months", "1 year"],
    correctIndex: 1,
    difficulty: Difficulty.WARMUP,
    category: "Learner Permit",
    handbookRef: "Page 113, Section 3"
  },
  // SECTION 4 - OFFICIAL SAMPLE
  {
    id: 's4q1',
    text: "Which class of license is required to drive a regular personal vehicle?",
    options: ["Class A", "Class B", "Class C", "Class D"],
    correctIndex: 3,
    difficulty: Difficulty.WARMUP,
    category: "License Types",
    handbookRef: "Page 113, Section 4"
  },
  // SECTION 7 - OFFICIAL SAMPLE
  {
    id: 's7q1',
    text: "Everyone in your vehicle must have a fastened seat belt or child seat.",
    options: ["True", "False", "Only in the front seat", "Only if under 18"],
    correctIndex: 0,
    difficulty: Difficulty.CORE,
    category: "Safety Belts",
    handbookRef: "Page 113, Section 7"
  },
  {
    id: 's7q2',
    text: "Children 12 and under should ride in which seat of the vehicle?",
    options: ["Front passenger seat", "The back seat", "Any seat with a harness", "The driver's lap"],
    correctIndex: 1,
    difficulty: Difficulty.CORE,
    category: "Safety Belts",
    handbookRef: "Page 113, Section 7"
  },
  // SECTION 10 - ALCOHOL (EXPERT)
  {
    id: 's10q1',
    text: "If you are under 21 and driving with any measurable amount of alcohol in your body, how long will driving privileges be denied?",
    options: ["90 days", "6 months", "1 year", "Until age 21"],
    correctIndex: 1,
    difficulty: Difficulty.EXPERT,
    category: "DUI Laws",
    handbookRef: "Page 113, Section 10"
  },
  {
    id: 's10q2',
    text: "If you are under 21 and convicted of a first DUI, you are automatically restricted to an ignition interlock device for:",
    options: ["1 year", "2 years", "3 years", "Life"],
    correctIndex: 2,
    difficulty: Difficulty.EXPERT,
    category: "DUI Laws",
    handbookRef: "Page 113, Section 10"
  },
  // TECHNICAL GOTCHAS
  {
    id: 't1',
    text: "What is the legal distance you must park away from a stop sign or traffic signal?",
    options: ["15 feet", "20 feet", "30 feet", "50 feet"],
    correctIndex: 2,
    difficulty: Difficulty.EXPERT,
    category: "Technical Distances"
  },
  {
    id: 't2',
    text: "You are parking uphill WITH a curb in Cedar City. Which way do you turn your wheels?",
    options: ["Toward the curb (Right)", "Away from the curb (Left)", "Straight", "Parallel to curb"],
    correctIndex: 1,
    difficulty: Difficulty.CORE,
    category: "Parking"
  }
];

export const MILESTONES: Milestone[] = [
  { id: '1', name: 'St. George', section: 'Warm-up Basics', difficulty: Difficulty.WARMUP, requiredScore: 80 },
  { id: '2', name: 'Cedar City', section: 'Core Logic', difficulty: Difficulty.CORE, requiredScore: 80 },
  { id: '3', name: 'Fillmore', section: 'Right-of-Way', difficulty: Difficulty.CORE, requiredScore: 90 },
  { id: '4', name: 'Provo', section: 'Parking & Technical', difficulty: Difficulty.CORE, requiredScore: 90 },
  { id: '5', name: 'Salt Lake City', section: 'DUI & Legal', difficulty: Difficulty.EXPERT, requiredScore: 80 },
  { id: '6', name: 'Logan', section: 'Expert Mastery', difficulty: Difficulty.EXPERT, requiredScore: 100 },
];
