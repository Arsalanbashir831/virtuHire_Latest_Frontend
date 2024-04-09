import React, { useState, useRef } from 'react';

function SpeechToText() {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      setText(transcript);
    };

    recognition.onend = () => {
      console.log('Recognition stopped.');
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
    recognitionRef.current = recognition; // Store recognition instance in ref
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleTextareaChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="mx-auto p-4 border rounded-lg shadow-lg bg-gray-100 w-full h-[100vh] flex flex-col justify-center items-center">
      <textarea
        className="w-full p-2 text-lg border rounded-md resize-none"
        rows="4"
        value={text}
        onChange={handleTextareaChange} // Capture textarea changes
        placeholder="Speak into your microphone..."
      ></textarea>
      <div className="mt-4">
        {isRecording ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
            onClick={stopRecording}
          >
            Stop Recording
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
            onClick={startRecording}
          >
            Start Recording
          </button>
        )}
      </div>
    </div>
  );
}

export default SpeechToText;
