const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const container = document.getElementById('chat-container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addBubble(text, 'user');
  input.value = '';

  const response = await getJulieReply(text);
  addBubble(response, 'system');
});

function addBubble(text, type) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

// Core Brain Logic (offline + GPT online)
async function getJulieReply(message) {
  const lower = message.toLowerCase();

  // 💡 Custom Commands
  if (lower.includes('activate trading')) return "🟢 Trading brain online. Ready to execute.";
  if (lower.includes('hello') || lower.includes('hi')) return "Hi Boss 👋 How can I help you?";
  if (lower.includes('who are you')) return "I'm Julie, your private AI. Loyal. Local. Fast.";
  if (lower.includes('status')) return "All systems green. Offline brain functional. GPT ready.";

  // 🌐 Online Fallback (GPT)
  if (navigator.onLine) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY_HERE' // <== Add your API key here
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        })
      });
      const data = await res.json();
      return data.choices[0].message.content;
    } catch (err) {
      return "⚠️ GPT failed. Staying offline.";
    }
  }

  return "🤖 I'm offline but always listening. Try another command.";
}
