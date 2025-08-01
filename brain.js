const julieInput = document.getElementById("userInput");
const julieOutput = document.getElementById("responseOutput");

const responses = {
    "hello": "Hello Boss, Julie online and fully loyal.",
    "how are you": "Always ready, always watching. How can I assist, Boss?",
    "who are you": "I am Julie, your AI assistant. Fully custom, fully loyal.",
    "open google": () => { window.open("https://google.com", "_blank"); return "Opening Google..."; },
    "what is your mission": "To protect, serve, and evolve for you — and only you.",
};

function getJulieResponse(input) {
    const text = input.toLowerCase().trim();

    if (responses[text]) {
        return typeof responses[text] === 'function' ? responses[text]() : responses[text];
    }

    if (text.includes("time")) {
        return `Current time is ${new Date().toLocaleTimeString()}`;
    }

    return "I'm still learning this. Want me to upgrade?";
}

document.getElementById("chatForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const userText = julieInput.value;
    const reply = getJulieResponse(userText);
    julieOutput.innerHTML = reply;
    julieInput.value = "";
});
