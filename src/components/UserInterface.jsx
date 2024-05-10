import React, { useState, useRef, useEffect } from "react";
import { Bars, CirclesWithBar, Audio, Puff } from "react-loader-spinner";
import ChatMessage from "./ChatMessage";

export const UserInterface = () => {

  const ngrokurl = "http://127.0.0.1:8000";
  const [transcription, setTranscription] = useState("");
  const [textInput, setTextInput] = useState("");
  const [clicktranscribe, setclicktranscribe] = useState(false);

  const [messages, setMessages] = useState([]); // New state for storing messages


  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  // Function to transcribe audio
  const handleTranscribe = async () => {
    setclicktranscribe(true);
    setTranscription(textInput);
    setMessages([...messages, { type: "user", content: textInput }]);
    setclicktranscribe(false);
  }

  const chatContainerRef = useRef(null);
  // Scroll to the bottom of the chat container whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col bg-gradient-to-r bg-cover bg-center from-gray-900 via-black to-gray-900  h-screen max-h-screen mt-6 pt-10 no-scrollbar overflow-y-auto ">
    <div className="flex justify-center items-center mx-auto p-2 my-4 rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-700 w-5/6 md:w-3/6 text-xs lg:text-base text-center">
      <p className="font-bold text-white">
        Welcome to the NewsGuardian Chatbot - the chat assistant for
        real-time News Annalyser.
      </p>
    </div>

    <div
      className="flex-grow chat-container overflow-y-auto no-scrollbar py-2 mb-3"
      style={{ maxHeight: "calc(100vh - 160px)", overflow: "auto" }}
      ref={chatContainerRef}
    >
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          type={message.type}
          content={message.content}
        />
      ))}
    </div>
    <div className="justify-evenly items-center mx-auto flex bottom-0 left-0 right-0 bg-gray-700 border-1 py-6 px-2 w-11/12 lg:w-10/12 rounded-3xl mb-6">
      <div className="flex flex-row justify-center w-full ">
        <div className="flex flex-col w-full md:w-11/12 items-center justify-center">
          <div className="flex flex-row justify-center items-center w-full md:w-11/12">
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              className="border border-gray-700 bg-slate-900 text-white p-2 rounded-md justify-center flex items-center w-full"
              placeholder="Type your message..."
            />
          </div>

          {/*<div className="flex flex-row justify-center items-center mt-2">
            {suggestions.slice(-5).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(index)}
                className="bg-indigo-500 text-white font-semibold px-4 py-2 m-2 rounded-md"
              >
                {suggestion}
              </button>
            ))}
            </div>*/}
        </div>

        <div className="flex justify-center items-end flex-row w-3/6 md:w-2/6">
          {clicktranscribe && (
            <CirclesWithBar
              height="40"
              width="40"
              color="#009CFF"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              outerCircleColor=""
              innerCircleColor=""
              barColor=""
              ariaLabel="circles-with-bar-loading"
            />
          )}
          {true ? (
            <button
              onClick={handleTranscribe}
              className=" hover:animate-pulse text-white bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 w-4/6 font-bold shadow-md py-2 px-2 ml-4 rounded-2xl focus:outline-none focus:shadow-outline text-sm md:text-lg"
            >
              Send <span>&rarr;</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  </div>
  );
};
