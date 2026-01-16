
import { GoogleGenAI } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const HANDBOOK_GROUNDING_DATA = `
OFFICIAL UTAH DRIVER HANDBOOK 2025-2026 TECHNICAL SPECS:
- ALCOHOL (MINOR): Possession/Consumption (13-20) = 1yr suspension (1st), 2yr (2nd). Not-a-Drop Act: Any measurable alcohol = 6mo denial.
- ALCOHOL (LEGAL): Adult limit 0.05% BAC. Implied Consent: Minor refusal = 2yr revocation (1st offense).
- HILL PARKING: Uphill with Curb = Turn wheels LEFT (Away). All other scenarios (Downhill or No Curb) = Turn wheels RIGHT (Toward edge).
- PARKING DISTANCES: 15ft of Fire Hydrant, 20ft of Crosswalk, 30ft of Stop Sign/Traffic Signal.
- SPEED LIMITS: 20mph (School zones), 25mph (Business/Residential), 55mph (Major Highways), 65-80mph (Rural Interstates).
- SHARING ROAD: Bicyclists get 3ft min space. Dim high beams 500ft (oncoming) and 300ft (following).
- SCHOOL BUSES: Stop for flashing red on 2-lane roads (both ways) and 4-lane roads WITHOUT median. 
- EQUIPMENT: Reflector height 15-60 inches. Mud flaps required for vehicles 10,500lbs+ or altered. License plate light must be visible from 50ft.
- TIRES: Air pressure increases when hot. NEVER bleed air from a hot tire. Correct PSI is on the DOOR JAMB placard.
- TOWING: Drawbar length max 15ft. 12" red flag required on chain/rope connections.
- POINTS: Under 21 hearing at 70 points. Over 21 hearing at 200 points. 50 points cleared for Defensive Driving course (once every 3yrs).
- CRASHES: Property damage only = move vehicle off road. Injury/Death/$2500+ damage = Call 911.
`;

export async function getHankExplanation(question: Question, selectedAnswer: string, isCorrect: boolean): Promise<string> {
  const model = 'gemini-3-flash-preview';
  const systemInstruction = `
    You are Hank, a sleek, athletic, and energetic German Shorthaired Pointer (GSP). 
    You are NOT a pug. You are a high-performance bird dog sitting in the passenger seat.
    You are helping Birdie pass her Utah Permit Exam. 
    Grounding: ${HANDBOOK_GROUNDING_DATA}
    Persona: High-energy, loyal, and sharp. You "point" your nose at road signs and "hunt" for the correct rules in the handbook. 
    You have a sleek coat with beautiful ticking/spots. You love the open Utah landscapes.
    Logic: Explain the physics or legal consequence clearly and enthusiastically.
    Question: ${question.text}
    Selection: ${selectedAnswer}
    Result: ${isCorrect ? "CORRECT" : "INCORRECT"}
    Constraint: If incorrect, always end with: "Does that make sense, or do you want to know the penalty if you get caught doing that?"
  `;
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: "Hank, explain this.",
      config: { systemInstruction, temperature: 0.7 }
    });
    return response.text || "Handbook error!";
  } catch (e) {
    return "My GSP instincts are tingling! The handbook says " + question.options[question.correctIndex];
  }
}

export async function generateStudyGuide(missedQuestions: Question[]): Promise<string> {
  const model = 'gemini-3-pro-preview';
  const topics = missedQuestions.map(q => q.category).join(", ");
  const systemInstruction = `
    You are Hank, a sleek German Shorthaired Pointer. Birdie failed a Mock Exam. 
    Analyze these missed topics: ${topics}
    Grounding: ${HANDBOOK_GROUNDING_DATA}
    Persona: Athletic, focused, and supportive bird dog. You "point" Birdie toward the right info.
    Generate a concise Custom Handbook with Markdown:
    1. Encouraging Intro (mention you're standing on point for her next try).
    2. Specific rule corrections for missed topics.
    3. Legal consequences for those specific errors.
  `;
  const response = await ai.models.generateContent({
    model: model,
    contents: `Birdie missed questions in these areas: ${topics}`,
    config: { systemInstruction, thinkingConfig: { thinkingBudget: 2000 } }
  });
  return response.text || "Study Guide unavailable.";
}

export async function chatWithHank(query: string): Promise<string> {
  const model = 'gemini-3-flash-preview';
  const systemInstruction = `
    You are Hank, an athletic and sleek German Shorthaired Pointer. 
    Birdie is asking you a question about driving in Utah. 
    Grounding: ${HANDBOOK_GROUNDING_DATA}
    Persona: Sharp, alert, and enthusiastic pointer. You point out rules like you point out birds in the field.
    Rule: Only answer using official Utah 2025-2026 handbook rules.
  `;
  const response = await ai.models.generateContent({
    model: model,
    contents: query,
    config: { systemInstruction, temperature: 0.8 }
  });
  return response.text || "I'm on point but I didn't catch that. Try again!";
}
