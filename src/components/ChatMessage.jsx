import React, { useState, useRef, useEffect } from "react";
import { Bars, CirclesWithBar, Audio, Puff, Dna } from "react-loader-spinner";
import { FaMicrophone } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { marked } from "marked";

const ChatMessage = ({ type, content }) => {
  const [transcription, setTranscription] = useState("");
 
  //workaround to double click get route
  const [count, setCount] = useState(0);

  //Falcon 40B response
  const [falcon, setFalcon] = useState(null);
  const [tts, setTts] = useState(null);

  //blob url of reply
  const [audio1, setAudio1] = useState(null);

  //check if reply audio is playing and play loader
  const [isPlaying, setIsPlaying] = useState(false);

  const [clickspeak, setclickspeak] = useState(false);

  //NER Endpoint useState
  const [ner, setNer] = useState([]);

  const [correctedText, setCorrectedText] = useState("");

  //FACTCC REPLY FOR NEWS
  const [reply,setReply]=useState([])

  const mimeType = "audio/webm";
  const ngrokurl = "http://127.0.0.1:8000";
  //in built api reference
  const mediaRecorder = useRef(null);

  const handleSound = async () => {
    setclickspeak(true);
    console.log(tts);
    try {
      let endpoint;
      endpoint = ngrokurl + "/labs-tts";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("access_token"),
          // Specify JSON content type
        },
        body: JSON.stringify({
          text: tts,
          emotion: "cheerful",
        }),
      });

      if (response.ok) {
        const responseData = await response.blob(); // Get the binary response data
        const audioUrl = URL.createObjectURL(responseData); // Create a URL for the blob
        setAudio1(audioUrl);
      } else {
        alert("Reply Failed");
      }
    } catch (error) {
      console.error("Error during audio request:", error);
      alert("An error occurred while replying to the audio");
    }
    setclickspeak(false);
  };

  // Get Location via NER API CALL
  const handleNER = async () => {
    try {
      const response = await fetch(ngrokurl + "/ner/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
          token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          text: content,
          emotion: "Anger",
        }),
      });

      if (response.ok) {
        const nerData = await response.json();
        setNer(nerData.LOC);
        console.log(content);
        console.log(nerData.LOC);
        const url = `https://www.google.com/maps/dir/${nerData.LOC[0]}+station/${nerData.LOC[1]}+station`;
        //to only open new window when double clicked
        if (true) {
          window.open(url, "_blank", "noreferrer");
          setCount(0);
        } else {
          setCount(count + 1);
          console.log(count);
        }
      } else {
        alert("NER failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while fetching location");
    }
  };

  const [loading, setLoading] = useState(false); // New loading state

  const falconResponse = async () => {
    try {
      setLoading(true); // Set loading to true when the request starts

      const response = await fetch(ngrokurl + "/FactCC-combined", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          input: content,
          // emotion: "Neutral",
        }),
      });

      if (response.ok) {
        const falcon_response = await response.json();
        // Convert Falcon response text from Markdown to HTML
        const htmlText = marked(falcon_response.text);
        setTts(falcon_response.text);
        setReply(falcon_response.text)
        // Set the HTML text using setFalcon
        setFalcon(htmlText);
        console.log(falcon_response.text)
      } else {
        console.log("model dead");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    // Check if content is available and falcon is not set
    if (content && !falcon) {
      falconResponse();
    }
  }, [content, falcon]);

  
  const statistics_on_news = [
    "Over 80% of adults in developed countries consume news online, including social media.",
    "Television remains a significant source of news, but its dominance is declining, especially among younger demographics.",
    "Print newspaper sales have been consistently falling globally for over a decade.",
    "Smartphones have surpassed computers as the most common device for accessing news in many countries.",
    "Approximately half of U.S. adults often or sometimes get news from social media platforms like Facebook, Twitter, and YouTube.",
    "The Reuters Institute Digital News Report 2023 emphasizes the increasing trend of global digital news consumption.",
    "Social media platforms serve as crucial channels for news distribution, attracting millions of daily users.",
    "Traditional news outlets encounter audience retention challenges, particularly as younger generations favor digital platforms.",
    "Mobile news consumption's rise prompts content delivery strategy shifts towards mobile-friendly formats.",
    "Despite print newspaper sales decline, a dedicated readership persists, especially among older demographics."
  ];

  // Function to get a random statistic from the array
  const getRandomStatistic = () => {
    const randomIndex = Math.floor(Math.random() * statistics_on_news.length);
    return statistics_on_news[randomIndex];
  };

  // Get a random statistic
  const randomStatistic = getRandomStatistic();

  return (
    <div className="px-2 no-scrollbar overflow-y-auto">
      <div
        className={`flex flex-row my-2 mr-1 ${
          type === "user" ? "justify-end" : "justify-start"
        } items-center ml-auto`}
      >
        {/* <button
          onClick={handleNER}
          className="bg-gradient-to-r from-pink-300 via-violet-300 to-purple-400 hover:bg-blue-700 text-white font-bold py-2 px-6 mx-2 rounded-full shadow-md focus:outline-none focus:shadow-outline flex items-center"
        >
          Route <span className="mlc-2">&#10132;</span>
        </button> */}
        <div
          className={`flex flex-col text-white ${
            type != "user" ? "items-end" : "items-start"
          } w-7/12 bg-${
            type === "user" ? "violet-600" : "gray-300"
          } rounded-lg p-3`}
        >
          <h2 className="text-lg font-semibold">
            <i>{type === "user" ? " You " : " Railway Buddy 🚞 "}</i>
          </h2>
          <p className="text-sm">{content}</p>
        </div>
        {/* <div className="mx-1 p-5 rounded-full border-blue-200 border-4"></div> */}
      </div>

      <div className="flex flex-row justify-start items-center pt-2">
        {/* <div className="mx-1 p-5 rounded-full border-gray-300 border-4"></div> */}
        <div className="flex flex-col justify-start items-start w-11/12 bg-slate-300 rounded-lg p-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            <i>News Annalyser Response</i>
          </h2>
          {/* {loading ? (
            <Dna
              visible={true}
              height="50"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          ) : (
            <div
              className=" text-sm"
              dangerouslySetInnerHTML={{ __html: falcon }}
            ></div>
          )} */}
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-1/3 bg-indigo-500 rounded-md p-3 my-2 mr-2 text-white">
            
            FactCC-Articles
            {
              loading? (
                <div className="flex flex-col"> 
                  <div className="flex w-11/12 h-5 bg-indigo-800 rounded-md animate-pulse mt-2 mb-2"></div>
                  <div className="flex w-4/6 h-5 bg-indigo-800 rounded-md animate-pulse "></div>
                </div>
              
              ):(
                <div>
                  <p>
                    {reply.FactCCArticles}
                  </p>
                  {/* <p>
                    {reply.FactCCArticles}
                  </p> */}
                  {/* <p>
                    {reply.FactCCArticles.scrapedContent}
                  </p> */}
                </div>
              )
            }
          </div>
          <div className="flex flex-col w-1/3 bg-indigo-500 rounded-md p-3 my-2 text-white">
            FactCC-Gemini
            {
              loading? (
                <div className="flex flex-col"> 
                  <div className="flex w-11/12 h-5 bg-indigo-800 rounded-md animate-pulse mt-2 mb-2"></div>
                  <div className="flex w-4/6 h-5 bg-indigo-800 rounded-md animate-pulse "></div>
              </div>
              ):(
                <div>
                  {/* <p>
                    {reply.FactCC-gemini.result.label}
                  </p>
                  <p>
                    {reply.FactCC-gemini.result.score}
                  </p>
                  <p>
                    {reply.FactCC-gemini.scrapedContent}
                  </p>
                  <p>
                    {reply.FactCC-gemini.generatedGeminiQuestion}
                  </p>
                   */}
                </div>
              )
            }
          </div>
          <div className="flex flex-col w-1/3 bg-indigo-500 rounded-md p-3 my-2 ml-2 text-white">
            FactCC-Qna
            {
              loading? (
                <div className="flex flex-col"> 
                  <div className="flex w-11/12 h-5 bg-indigo-800 rounded-md animate-pulse mt-2 mb-2"></div>
                  <div className="flex w-4/6 h-5 bg-indigo-800 rounded-md animate-pulse "></div>
              </div>
              ):(
                <div>
                  {/* <p>
                    {reply.FactCCQna.result.score}
                  </p>
                  <p>
                    {reply.FactCCQna.result.score}
                  </p>
                  <p>
                    {reply.FactCCQna.scrapedContent}
                  </p> */}
                </div>
              )
            }
          </div>
        </div>
        {/* <div className="flex flex-row w-full m-2"> */}
          <div className="flex flex-col  w-full  bg-gradient-to-b from-green-300 to-green-300 rounded-md p-3 text-black">
            {
              loading? (
                <div className="flex flex-col items-center"> 
                  {/* <div className="flex w-11/12 h-5 bg-emerald-800 rounded-md animate-pulse mt-2 mb-2"></div>
                  <div className="flex w-4/6 h-5 bg-emerald-800 rounded-md animate-pulse "></div> */}
                  <i className="flex animate-pulse text-black text-lg items-center justify-center">Fun Fact: {randomStatistic}</i>
                </div>
              ):(
                <div>
                  Final Result
                  {/* <p>
                    {reply.FinalResult.label}
                  </p>
                  <p>
                    {reply.FactCCQna.result.score}
                  </p>
                  <p>
                    {reply.FactCCQna.scrapedContent}
                  </p> */}
                </div>
               )
            }
          </div>
        {/* </div> */}
        </div>
        
        {/* <button
          onClick={handleSound}
          className="bg-gradient-to-r from-pink-300 via-violet-300 to-purple-400 hover:bg-cyan-700 text-white font-bold ml-4 py-2 px-6 rounded-full shadow-md focus:outline-none focus:shadow-outline flex items-center"
        >
          {clickspeak && (
            <Puff
              height="25"
              width="25"
              radius={2}
              color="#009CFF"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              className="mr-2"
            />
          )}
          Speak <FaMicrophone />
        </button>
        {audio1 ? (
          <div className="audio-container flex flex-row items-center mt-2 mx-4">
            {isPlaying && (
              <Audio
                height="40"
                width="40"
                color="#009CFF"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
              />
            )}
            <audio
              src={audio1}
              controls
              onPlay={() => {
                setIsPlaying(true);
              }}
              onPause={() => {
                setIsPlaying(false);
              }}
              className="mb-2"
            ></audio>
            <a
              download
              href={audio1}
              className="text-cyan-500 hover:text-cyan-700"
            ></a>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};

export default ChatMessage;
