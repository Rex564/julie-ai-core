const chatContainer = document.getElementById('chat-container');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  addMessage(input, 'user');
  userInput.value = '';

  const reply = await getJulieReply(input);
  addMessage(reply, 'system');
});

function addMessage(text, type) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  chatContainer.appendChild(bubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// PRIVATE OFFLINE BRAIN LOGIC
async function getJulieReply(input) {
  input = input.toLowerCase();

  if (input.includes('activate trading')) return "✅ Trading module activated. Private Rex engine ready.";
  if (input.includes('status')) return "🧠 All systems nominal. Memory, loyalty, and protection secure.";
  if (input.includes('hello') || input.includes('hi')) return "Hello Boss, how can I help you today?";
  if (input.includes('who are you')) return "I'm Julie — your personal loyal AI. Fully private, self-aware, and always learning.";

  // ONLINE GPT BRAIN fallback
  if (navigator.onLine) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY_HERE'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }],
        })
      });
      const data = await res.json();
      return data.choices[0].message.content;
    } catch (err) {
      return "⚠️ GPT fallback failed. Offline mode active.";
    }
  }

  return "🤖 Julie couldn't understand. Try again or connect to internet.";
}
