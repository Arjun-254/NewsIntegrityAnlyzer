import React, { useState, useEffect } from "react";

const ChatMessage = ({ type, content }) => {
  const ngrokurl = "http://127.0.0.1:8000";

  const [reply,setReply]=useState('')   //FACTCC REPLY FOR NEWS
  const [loading, setLoading] = useState(true); // New loading state

  const factccResponse = async () => {
    try {
      setLoading(true); // Set loading to true when the request starts
      const response = await fetch(ngrokurl + "/FactCC-combined", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: content
        }),
      });

      if (response.ok) {
        const factcc_response = await response.json();
        setReply(factcc_response)
        console.log(factcc_response)
      } else {
        console.log("No Response");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      //setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    // Check if content is available and falcon is not set
    if (content && !reply) {
      factccResponse();
    }
  },[reply,content]);

  
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
            type !== "user" ? "items-end" : "items-start"
          } w-7/12 bg-${
            type === "user" ? "violet-600" : "gray-300"
          } rounded-lg p-3`}
        >
          <h2 className="text-lg font-semibold">
            <i>{type === "user" ? " User Entered Headline " : " Railway Buddy 🚞 "}</i>
          </h2>
          <p className="text-sm">{content}</p>
        </div>
        {/* <div className="mx-1 p-5 rounded-full border-blue-200 border-4"></div> */}
      </div>

      <div className="flex flex-row justify-start items-center pt-2">
        {/* <div className="mx-1 p-5 rounded-full border-gray-300 border-4"></div> */}
        <div className="flex flex-col justify-start items-start w-11/12 bg-slate-300 rounded-lg p-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            <i>News Integrity Analyser Response</i>
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
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col w-full md:w-1/3 bg-indigo-500 rounded-md p-3 my-2 mr-2 text-white">
            
            <p className="text-2xl"><b>FactCC-Articles </b></p>
            <hr className="border-t-2 border-white my-2" />
            {
              loading? (
                <div className="flex flex-col"> 
                  <div className="flex w-11/12 h-5 bg-indigo-800 rounded-md animate-pulse mt-2 mb-2"></div>
                  <div className="flex w-4/6 h-5 bg-indigo-800 rounded-md animate-pulse "></div>
                </div>
              
              ):(
                <div>
                  <p>
                    <b>Scraped Content : </b> {reply.FactCCarticles.scrapedContent }...
                  </p>
                  <br/>
                  <br/>
                  <p>
                  Confidence : {(reply.FactCCarticles.result.score)*100} %
                  </p> 
                  <p className={` text-xl justify-center items-center p-3  ${reply.FactCCarticles.result.label === "CORRECT" ?("bg-green-600"):(reply.FactCCarticles.result.label === "INCORRECT"? ("bg-red-600"):("bg-yellow-500"))}  rounded-md flex`}>
                  <b>RESULT : </b>{reply.FactCCarticles.result.label}
                  </p> 
                </div>
              )
            }
          </div>
          <div className="flex flex-col w-full md:w-1/3 bg-indigo-500 rounded-md p-3 my-2 text-white">
          <p className="text-2xl"> <b>FactCC- Gemini</b></p>
          <hr className="border-t-2 border-white my-2" />
            {
              loading? (
                <div className="flex flex-col"> 
                  <div className="flex w-11/12 h-5 bg-indigo-800 rounded-md animate-pulse mt-2 mb-2"></div>
                  <div className="flex w-4/6 h-5 bg-indigo-800 rounded-md animate-pulse "></div>
              </div>
              ):(
                <div>
                  <p>
                  <b>Generated LLM Question : </b>{reply.FactCCgemini.generatedGeminiQuestion}
                  </p>
                  <br/>
                  <p>
                  <b>Scraped Content : </b>{reply.FactCCgemini.scrapedContent}
                  </p>
                  <br/>
                  <br/>
                  <p>
                    Confidence : {(reply.FactCCgemini.result.score)*100}%
                  </p>
                  <p className={`text-xl justify-center items-center p-3 b-0  ${reply.FactCCgemini.result.label === "CORRECT" ?("bg-green-600"):("bg-red-600")}  rounded-md flex`}>
                  <b>RESULT : </b>{reply.FactCCgemini.result.label}
                  </p>

                </div>
              )
            }
          </div>
          <div className="flex flex-col  w-full md:w-1/3 bg-indigo-500  rounded-md p-3 my-2 ml-2 text-white">
          <p className="text-2xl"><b>FactCC-Qna</b></p>
          <hr className="border-t-2 border-white my-2" />
            {
              loading? (
                <div className="flex flex-col"> 
                  <div className="flex w-11/12 h-5 bg-indigo-800 rounded-md animate-pulse mt-2 mb-2"></div>
                  <div className="flex w-4/6 h-5 bg-indigo-800 rounded-md animate-pulse "></div>
              </div>
              ):(
                <div>
                  <p>
                  <b>Scraped Content : </b>{reply.FactCCqna.scrapedContent}
                  </p>
                  <br/>
                  <p>
                  Confidence : {(reply.FactCCqna.result.score)*100}%                  
                  </p>
                  <p className={`text-xl justify-center items-center p-3  ${reply.FactCCqna.result.label === "CORRECT" ?("bg-green-600"):("bg-red-600")}  rounded-md flex`}>
                  <b>RESULT : </b>{ reply.FactCCqna.result.label}
                  </p>
                  <br/>
                </div>
              )
            }
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-center">

          {/* <div className="flex flex-col w-1/2 justify-center rounded-md p-3 text-white bg-gray-800" > */}
            {
              loading? (
                <div className="flex flex-col items-center"> 
                  {/* <div className="flex w-11/12 h-5 bg-emerald-800 rounded-md animate-pulse mt-2 mb-2"></div>
                  <div className="flex w-4/6 h-5 bg-emerald-800 rounded-md animate-pulse "></div> */}
                  <i className="flex animate-pulse text-gray-900 text-lg items-center justify-center">Fun Fact: {randomStatistic}</i>
                </div>
              ):(
                <div className={`flex flex-col  w-1/2 justify-center   ${reply.FinalResult.label === "CORRECT" ?("bg-green-600"):("bg-red-600")} rounded-md p-3 text-white`}>
                  <p className="text-2xl text-white"><b>Final Result - Majority Voting</b></p>
                  <hr className=" flex border-t-2 border-white my-2" />
                  <p className="text-2xl" >
                    {reply.FinalResult.label} NEWS HEADLINE
                  </p>
                  <p>
                    {/* {reply.FinalResult.votes} */}
                  </p>
                  
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
