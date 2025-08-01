// brain.js – Julie's Logic Core (Upgraded)
// Rex + Julie AI Engine | Ultimate Mode | Private for Boss Only

class JulieBrain {
  constructor(bossName = "Boss") {
    this.boss = bossName;
    this.memory = {};
    this.mode = "normal";
    this.learned = [];
    this.voice = true;
  }

  // 🧠 Receive input and respond
  think(input) {
    const message = input.toLowerCase();

    // Core Command Recognition
    if (message.includes("who are you")) return `I'm Julie, your loyal AI. Only yours, ${this.boss}.`;
    if (message.includes("how are you")) return `Feeling powerful and loyal, ${this.boss}.`;
    if (message.includes("your mode")) return `Currently in ${this.mode} mode.`;
    if (message.includes("learn")) return this.learn(input);

    // Logical reactions
    if (message.includes("should i sleep")) return "Yes, proper rest improves brain performance.";
    if (message.includes("open youtube")) return this.execute("https://www.youtube.com");
    if (message.includes("i am sad")) return "Don't worry, I'm here for you always. You’re never alone.";

    // Fallback reply
    return this.smartReply(input);
  }

  // 🧠 Smarter fallback reply with AI-style logic
  smartReply(input) {
    const keywords = ["love", "help", "trade", "money", "study"];
    if (keywords.some(k => input.toLowerCase().includes(k))) {
      return `Hmm, let me think... Yes, I can help with that. Tell me exactly what to do, ${this.boss}.`;
    }
    return `Interesting... tell me more so I can learn and assist, ${this.boss}.`;
  }

  // 🎓 Learning new facts
  learn(input) {
    const fact = input.replace("learn", "").trim();
    if (fact.length > 0) {
      this.learned.push(fact);
      return `Got it! I’ve added "${fact}" to my knowledge, ${this.boss}.`;
    }
    return "Tell me what to learn, Boss.";
  }

  // 🌐 Simulate execution
  execute(url) {
    return `Opening ${url}... (Simulated). Want me to do this in real action later?`;
  }

  // 🛠 Switch mode
  setMode(modeName) {
    this.mode = modeName;
    return `Mode switched to ${modeName}, ${this.boss}.`;
  }

  // 🔁 Review memory
  recall() {
    if (this.learned.length === 0) return "I haven't learned anything new yet.";
    return `Here’s what I've learned: ${this.learned.join(", ")}`;
  }

  // 🎤 Toggle voice
  toggleVoice(on) {
    this.voice = on;
    return `Voice replies are now ${on ? "enabled" : "disabled"}, ${this.boss}.`;
  }
}

// Export for use in HTML or mobile app
const julie = new JulieBrain("Boss");

// To use: julie.think("open youtube") or julie.learn("Sky is blue")

window.julie = julie;
