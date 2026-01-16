
import React, { useState } from 'react';
import { chatWithHank } from '../services/geminiService';

const SECTIONS = [
  {
    id: 'alcohol',
    title: 'Alcohol & Driving',
    content: `🚫 ZERO TOLERANCE - Here's the deal:

🍺 What's BAC? It means "Blood Alcohol Content" - basically how much alcohol is in your body. For adults it's 0.05%, but for you? It's ZERO. Like, not even a sip.

⚠️ "Not-a-Drop" Law: If you're under 21 and have ANY alcohol in your system while driving, you can't get your license for 6 MONTHS. That's half a year of bumming rides.

🔒 Getting Caught with Alcohol (ages 13-20): Even just having alcohol on you = 1 YEAR license suspension. Worth it? Nope.

🤝 "Implied Consent" Explained: When you get your license, you're automatically agreeing that if a cop suspects you've been drinking, you WILL take a breathalyzer test. Refuse? That's an automatic 2 YEAR license revocation. Don't even think about it.`
  },
  {
    id: 'parking',
    title: 'Parking Rules',
    content: `🅿️ WHERE NOT TO PARK - Memorize these distances!

🚒 Fire Hydrant: Stay 15 feet away (about 3 car lengths). Firefighters need access!

🚶 Crosswalk: Keep 20 feet clear so pedestrians can be seen.

🛑 Stop Sign/Traffic Light: Park at least 30 feet away so other drivers can see the sign.

⛰️ HILLS - Which way do your wheels go?

Going UPHILL with a curb? Turn wheels LEFT (away from curb). If your car rolls, it'll hit the curb and stop!

Going DOWNHILL or no curb? Turn wheels RIGHT (toward curb/edge). Your car will roll off the road, not into traffic.

💡 Easy trick: "Up-Left, Down-Right" or think "UL-DR" like a video game combo!`
  },
  {
    id: 'sharing',
    title: 'Sharing the Road',
    content: `🚴 BIKES, LIGHTS & BUSES - Be a good road buddy!

🚲 Passing Cyclists: Give them at least 3 FEET of space when passing. That's about an arm's length. They're way more vulnerable than you in a car!

💡 High Beams Etiquette:
- Car coming toward you? Dim your lights when they're 500 feet away (about 1.5 football fields)
- Following someone? Dim at 300 feet (1 football field) so you don't blind them in their mirror

🚌 School Bus Rules:
When a school bus has its RED LIGHTS FLASHING:
- On a 2-lane road? EVERYONE stops, both directions
- Kids could be crossing!
- Only pass when the red lights stop and the bus moves`
  },
  {
    id: 'maint',
    title: 'Car Care Basics',
    content: `🔧 TAKING CARE OF YOUR RIDE - Quick tips!

🌡️ Hot Tires Warning: After driving, your tires get hot and the pressure goes up. NEVER let air out of hot tires! Wait until they cool down. Letting air out when hot = dangerously low pressure later.

📋 Tire Pressure (PSI): Not sure how much air your tires need? Check the sticker on the inside of your driver's door (the door jamb). It tells you the exact PSI for YOUR car. Don't just guess!

🔦 Reflectors on Your Car: They need to be between 15-60 inches off the ground. This is a test trivia question - just memorize it!

💡 Pro tip: Take a photo of your door jamb sticker so you always have your tire pressure info on your phone!`
  }
];


const HandbookViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'hank', text: string }[]>([
    { role: 'hank', text: "Woof! My nose is tuned to the Utah Handbook. Pick a category or bark a question at me!" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;
    const msg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setChatInput("");
    setLoading(true);
    const response = await chatWithHank(msg);
    setMessages(prev => [...prev, { role: 'hank', text: response }]);
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-10 h-[calc(100vh-160px)] overflow-hidden">
      {/* Rules Browser */}
      <div className="lg:w-1/2 flex flex-col chunky-card border-white/5 overflow-hidden animate-in slide-in-from-left duration-500">
        <div className="p-8 bg-black/40 border-b border-white/10 flex justify-between items-center shrink-0">
          <h3 className="text-xl font-black italic uppercase tracking-tighter">Utah Rules DB</h3>
          <span className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">v2026 Stable</span>
        </div>

        <div className="flex border-b border-white/5 shrink-0 overflow-x-auto no-scrollbar">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === s.id ? 'text-lime-400 bg-white/5 border-b-4 border-lime-400' : 'text-white/30 hover:text-white/60'}`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div className="flex-1 p-8 overflow-y-auto bg-black/20 custom-scrollbar">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-2 h-6 bg-lime-400 rounded-full"></span>
              <h4 className="font-black text-white/40 uppercase text-xs tracking-[0.3em]">Critical Intel</h4>
            </div>

            <div className="whitespace-pre-wrap text-white font-bold text-lg leading-relaxed bg-[#121212] p-8 rounded-[2rem] border border-white/5 shadow-inner italic">
              {SECTIONS.find(s => s.id === activeTab)?.content}
            </div>

            <div className="p-6 bg-purple-500/10 rounded-2xl border border-purple-500/20 flex gap-4">
              <i className="fas fa-bolt text-purple-400 mt-1"></i>
              <p className="text-[11px] text-purple-200 font-black uppercase tracking-widest leading-normal">
                Pro Tip: Utah is strict on these technicalities. Mastering the exact numbers is the only way to that 80% pass.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hank Chat */}
      <div className="lg:w-1/2 flex flex-col chunky-card border-white/5 overflow-hidden animate-in slide-in-from-right duration-500">
        <div className="p-8 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl border-2 border-lime-400 p-1 bg-[#121212] shadow-[0_0_20px_rgba(190,242,100,0.1)] overflow-hidden relative flex items-center justify-center">
              <img
                src="/Hank.png"
                alt="Hank"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-black text-white italic text-lg">Hank (The GSP)</h4>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Pointer Sync: Active</span>
              </div>
            </div>
          </div>
          <i className="fas fa-bone text-white/5 text-5xl"></i>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-black/20 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-6 rounded-[1.5rem] text-sm font-bold shadow-xl leading-relaxed ${m.role === 'user' ? 'utah-gradient text-white rounded-tr-none' : 'bg-[#2a2a2a] text-white/90 rounded-tl-none border border-white/5 italic'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 p-4 rounded-2xl flex gap-2 border border-white/10">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleChat} className="p-8 bg-black/40 border-t border-white/10 shrink-0">
          <div className="relative group">
            <input
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Ask the pointer for rule intel..."
              className="w-full pl-8 pr-20 py-6 bg-[#121212] border-2 border-white/5 rounded-[1.5rem] focus:outline-none focus:border-lime-400/50 font-bold text-sm text-white transition-all placeholder:text-white/20"
            />
            <button type="submit" className="absolute right-3 top-3 w-12 h-12 lime-gradient text-black rounded-xl flex items-center justify-center chunky-button">
              <i className="fas fa-paw"></i>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default HandbookViewer;
