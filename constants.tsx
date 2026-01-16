
import { Question, Difficulty, Milestone } from './types';

export const UTAH_QUESTIONS: Question[] = [
  // SECTION 3 - OFFICIAL SAMPLE
  { id: 's3q1', text: "If you are 19 years of age or older and never had a driver license, do you have to take a driver education course?", options: ["Yes, always", "No, but you must hold a permit for 90 days", "No, but you must pass a skills test only", "Only if you are under 21"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Driver Education", handbookRef: "Page 113, Section 3" },
  { id: 's3q2', text: "If you are 17 years of age or younger, how long must you hold a learner permit before applying for a license?", options: ["3 months", "6 months", "9 months", "1 year"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Learner Permit", handbookRef: "Page 113, Section 3" },

  // SECTION 4 - LICENSE CLASSES
  { id: 's4q1', text: "Which class of license is required to drive a regular personal vehicle?", options: ["Class A", "Class B", "Class C", "Class D"], correctIndex: 3, difficulty: Difficulty.WARMUP, category: "License Types", handbookRef: "Page 113, Section 4" },
  { id: 's4q2', text: "A Class D license allows you to drive vehicles up to what weight?", options: ["10,000 lbs", "15,000 lbs", "26,000 lbs", "50,000 lbs"], correctIndex: 2, difficulty: Difficulty.CORE, category: "License Types" },

  // SECTION 7 - SAFETY
  { id: 's7q1', text: "Everyone in your vehicle must have a fastened seat belt or child seat.", options: ["True", "False", "Only in the front seat", "Only if under 18"], correctIndex: 0, difficulty: Difficulty.CORE, category: "Safety Belts", handbookRef: "Page 113, Section 7" },
  { id: 's7q2', text: "Children 12 and under should ride in which seat of the vehicle?", options: ["Front passenger seat", "The back seat", "Any seat with a harness", "The driver's lap"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Safety Belts", handbookRef: "Page 113, Section 7" },
  { id: 's7q3', text: "In Utah, you can be fined for not wearing a seat belt even if you aren't pulled over for another reason.", options: ["True", "False"], correctIndex: 0, difficulty: Difficulty.CORE, category: "Safety Belts" },

  // SECTION 10 - ALCOHOL
  { id: 's10q1', text: "If you are under 21 and driving with any measurable amount of alcohol, how long will driving privileges be denied?", options: ["90 days", "6 months", "1 year", "Until age 21"], correctIndex: 1, difficulty: Difficulty.EXPERT, category: "DUI Laws", handbookRef: "Page 113, Section 10" },
  { id: 's10q2', text: "If you are under 21 and convicted of a first DUI, you are automatically restricted to an ignition interlock device for:", options: ["1 year", "2 years", "3 years", "Life"], correctIndex: 2, difficulty: Difficulty.EXPERT, category: "DUI Laws", handbookRef: "Page 113, Section 10" },
  { id: 's10q3', text: "The legal BAC limit for adults 21+ in Utah is:", options: ["0.02%", "0.05%", "0.08%", "0.10%"], correctIndex: 1, difficulty: Difficulty.EXPERT, category: "DUI Laws" },

  // RIGHT OF WAY & TURNS
  { id: 'rw1', text: "Who has the right-of-way at a 4-way stop if two vehicles arrive at the same time?", options: ["The vehicle on the left", "The vehicle on the right", "The faster vehicle", "The heavier vehicle"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Right of Way" },
  { id: 'rw2', text: "When turning left, you must yield to oncoming traffic unless:", options: ["You have a green circle", "You have a green arrow", "You are in a hurry", "The other car is far away"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Right of Way" },
  { id: 'rw3', text: "You must signal your intent to turn at least how many feet before the turn?", options: ["50 feet", "100 feet", "200 feet", "300 feet"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Turns" },
  { id: 'rw4', text: "Roundabouts move in which direction?", options: ["Clockwise", "Counter-clockwise", "Either way", "Toward the center"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Right of Way" },

  // PARKING
  { id: 'p1', text: "When parking uphill WITH a curb, which way do you turn your wheels?", options: ["Toward the curb (Right)", "Away from the curb (Left)", "Straight", "Parallel to curb"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Parking" },
  { id: 'p2', text: "When parking downhill WITH a curb, which way do you turn your wheels?", options: ["Toward the curb (Right)", "Away from the curb (Left)", "Straight", "Backward"], correctIndex: 0, difficulty: Difficulty.CORE, category: "Parking" },
  { id: 'p3', text: "What is the legal distance you must park away from a fire hydrant?", options: ["10 feet", "15 feet", "20 feet", "30 feet"], correctIndex: 1, difficulty: Difficulty.EXPERT, category: "Technical Distances" },
  { id: 'p4', text: "What is the legal distance you must park away from a stop sign?", options: ["15 feet", "20 feet", "30 feet", "50 feet"], correctIndex: 2, difficulty: Difficulty.EXPERT, category: "Technical Distances" },

  // SPEED & SIGNS
  { id: 'ss1', text: "A yellow diamond-shaped sign usually represents:", options: ["Regulatory info", "Warning / Caution", "Services", "Recreation"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Signs" },
  { id: 'ss2', text: "A red circle with a white horizontal line means:", options: ["Stop", "Yield", "Do Not Enter", "One Way"], correctIndex: 2, difficulty: Difficulty.WARMUP, category: "Signs" },
  { id: 'ss3', text: "What is the speed limit in a residential area unless otherwise posted?", options: ["15 mph", "20 mph", "25 mph", "35 mph"], correctIndex: 2, difficulty: Difficulty.CORE, category: "Speed" },
  { id: 'ss4', text: "A flashing red light should be treated the same as a:", options: ["Yield sign", "Stop sign", "Caution light", "Green light"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Traffic Signals" },
  { id: 'ss5', text: "An orange sign typically indicates:", options: ["Hospital", "School Zone", "Construction Zone", "State Park"], correctIndex: 2, difficulty: Difficulty.WARMUP, category: "Signs" },

  // EMERGENCY & SHARING ROAD
  { id: 'er1', text: "If an emergency vehicle has lights/sirens on, you should:", options: ["Speed up to stay ahead", "Pull to the right and stop", "Stop immediately in your lane", "Follow them closely"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Emergency" },
  { id: 'er2', text: "Utah's 'Move Over' law requires you to move over or slow down for:", options: ["Only police cars", "Only ambulances", "Any stationary vehicle with flashing lights", "Tow trucks only"], correctIndex: 2, difficulty: Difficulty.CORE, category: "Traffic Laws" },
  { id: 'er3', text: "When a school bus has its red lights flashing and stop arm extended, you must stop unless:", options: ["You are in a hurry", "You are on the opposite side of a divided highway", "It is 2 lanes only", "The bus driver waves you on"], correctIndex: 1, difficulty: Difficulty.EXPERT, category: "School Zones" },
  { id: 'er4', text: "In a skid, which way should you turn the steering wheel?", options: ["Against the direction of the skid", "In the direction of the skid", "Keep it straight", "Hard brake"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Emergency" },

  // TECHNICAL DISTANCES
  { id: 't1', text: "You must dim your high beams within how many feet of an oncoming vehicle?", options: ["200 feet", "300 feet", "500 feet", "1000 feet"], correctIndex: 2, difficulty: Difficulty.EXPERT, category: "Technical Distances" },
  { id: 't2', text: "You must dim your high beams within how many feet when following another vehicle?", options: ["200 feet", "300 feet", "500 feet", "1000 feet"], correctIndex: 1, difficulty: Difficulty.EXPERT, category: "Technical Distances" },
  { id: 't3', text: "When following a motorcycle, you should allow for:", options: ["Less space", "The same space as a car", "More space", "A two-second gap"], correctIndex: 2, difficulty: Difficulty.CORE, category: "Sharing the Road" },

  // CATEGORY: SIGNALS & LANES
  { id: 'sl1', text: "A solid yellow line on your side of the center line means:", options: ["You may pass if clear", "Do not pass", "Merge soon", "Speed up"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Lanes" },
  { id: 'sl2', text: "Broken white lines separate lanes of traffic moving in:", options: ["Opposite directions", "The same direction", "Emergency lanes", "HOV lanes"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Lanes" },
  { id: 'sl3', text: "What should you do at a yellow flashing light?", options: ["Stop", "Yield and proceed with caution", "Speed up", "Treat as a green light"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Traffic Signals" },

  // MISC
  { id: 'm1', text: "Hydroplaning can occur at speeds as low as:", options: ["25 mph", "35 mph", "50 mph", "65 mph"], correctIndex: 1, difficulty: Difficulty.EXPERT, category: "Emergency" },
  { id: 'm2', text: "How much of a following distance should you maintain in ideal conditions?", options: ["1 second", "2 seconds", "4 seconds", "10 seconds"], correctIndex: 2, difficulty: Difficulty.CORE, category: "Safety" },
  { id: 'm3', text: "In Utah, it is legal to turn right on a red light after stopping unless otherwise posted.", options: ["True", "False"], correctIndex: 0, difficulty: Difficulty.WARMUP, category: "Traffic Laws" },
  { id: 'm4', text: "Utah's 'Basic Speed Law' states you should never drive faster than:", options: ["The posted limit", "Conditions allow safely", "75 mph", "Traffic flow"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Speed" },
  { id: 'm5', text: "A person who has been drinking alcohol will usually:", options: ["See more clearly", "React faster", "Have poor judgment", "Drive better"], correctIndex: 2, difficulty: Difficulty.WARMUP, category: "DUI Laws" },

  // SCENARIOS
  { id: 'sc1', text: "You are at a intersection with a green light but traffic is backed up. You should:", options: ["Enter and wait", "Wait until you can cross completely", "Honk for them to move", "Squeeze in the side"], correctIndex: 1, difficulty: Difficulty.CORE, scenario: "Trapped in Intersection", category: "Traffic Flow" },
  { id: 'sc2', text: "If your brakes fail while driving, you should first:", options: ["Turn off the engine", "Pump the brake pedal", "Shift to neutral", "Jump out"], correctIndex: 1, difficulty: Difficulty.EXPERT, scenario: "Brake Failure", category: "Emergency" },
  { id: 'sc3', text: "If you miss your exit on the freeway, you should:", options: ["Reverse on the shoulder", "Pull a U-turn over the median", "Go to the next exit", "Stop and wait for a gap"], correctIndex: 2, difficulty: Difficulty.CORE, scenario: "Missed Exit", category: "Freeway Driving" },
  { id: 'sc4', text: "A pedestrian starts to cross in front of your car even though they don't have the light. You should:", options: ["Honk and keep going", "Stop and let them pass", "Speed up to scare them", "Call the police"], correctIndex: 1, difficulty: Difficulty.WARMUP, scenario: "Jaywalking Pedestrian", category: "Sharing the Road" },

  // ADDING MORE FOR COVERAGE
  { id: 'add1', text: "High beam headlights should be used when:", options: ["In fog", "In rain", "At night when there are no oncoming vehicles", "In a snowstorm"], correctIndex: 2, difficulty: Difficulty.CORE, category: "Safety" },
  { id: 'add2', text: "To check your blind spot before changing lanes, you should:", options: ["Check your mirrors only", "Turn your head and look over your shoulder", "Trust your backup camera", "Honk first"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Lane Changes" },
  { id: 'add3', text: "When entering a freeway, you should use the acceleration lane to:", options: ["Stop and wait for a gap", "Reach the same speed as freeway traffic", "Drive on the shoulder", "Pass slower cars"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Freeway Driving" },
  { id: 'add4', text: "If you have a tire blowout, you should:", options: ["Brake hard", "Hold the steering wheel tightly and slow down gradually", "Turn off the engine", "Steer toward the shoulder immediately"], correctIndex: 1, difficulty: Difficulty.EXPERT, category: "Emergency" },
  { id: 'add5', text: "A 'No Standing' sign means you can stop only to:", options: ["Pick up or discharge passengers", "Wait for a friend", "Load or unload merchandise", "Check your phone"], correctIndex: 0, difficulty: Difficulty.CORE, category: "Parking" },
  { id: 'add6', text: "You must yield to pedestrians in a crosswalk:", options: ["Only if the crosswalk is marked", "Even if the crosswalk is unmarked", "Only if they have a walk signal", "Only if they are in your lane"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Sharing the Road" },
  { id: 'add7', text: "The 'Zero Tolerance' law applies to:", options: ["Speeding in school zones", "Drivers under 21 with any alcohol in their system", "Littering", "Reckless driving"], correctIndex: 1, difficulty: Difficulty.CORE, category: "DUI Laws" },
  { id: 'add8', text: "If you are involved in a crash, you must stop and:", options: ["Drive away if no one is hurt", "Exchange information with other drivers", "Only call insurance the next day", "Hide your car"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Traffic Laws" },
  { id: 'add9', text: "When driving in fog, you should use:", options: ["High beams", "Low beams", "Parking lights", "No lights"], correctIndex: 1, difficulty: Difficulty.CORE, category: "Safety" },
  { id: 'add10', text: "A bicycle is considered a:", options: ["Pedestrian", "Vehicle", "Toy", "Hazard"], correctIndex: 1, difficulty: Difficulty.WARMUP, category: "Sharing the Road" }
];

export const MILESTONES: Milestone[] = [
  { id: '1', name: 'St. George', section: 'Warm-up Basics', difficulty: Difficulty.WARMUP, requiredScore: 80 },
  { id: '2', name: 'Cedar City', section: 'Core Logic', difficulty: Difficulty.CORE, requiredScore: 80 },
  { id: '3', name: 'Fillmore', section: 'Right-of-Way', difficulty: Difficulty.CORE, requiredScore: 90 },
  { id: '4', name: 'Provo', section: 'Parking & Technical', difficulty: Difficulty.CORE, requiredScore: 90 },
  { id: '5', name: 'Salt Lake City', section: 'DUI & Legal', difficulty: Difficulty.EXPERT, requiredScore: 80 },
  { id: '6', name: 'Logan', section: 'Expert Mastery', difficulty: Difficulty.EXPERT, requiredScore: 100 },
];
