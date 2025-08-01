function speakToJulie() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN';
  recognition.start();

  recognition.onresult = function(event) {
    const command = event.results[0][0].transcript;
    respondToCommand(command);
  };
}
