import React, { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/fileupload";
import Graph from "../assets/lotties/Graph"; // Import the Graph component
import { processVideo } from "../assets/lotties/predictionLogic";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();
  const [classification, setClassification] = useState("");
  const [confidence, setConfidence] = useState("");
  const [graphData, setGraphData] = useState([]);
  const ref = useRef();
  const [ispopped, setIspopped] = useState(true);
  let imageUrl = undefined;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleChange = (e) => {
    const video = e.target.files[0];
    if (video) {
      const videoName = video.name;
      imageUrl = URL.createObjectURL(video);
      setImage(imageUrl);
      processVideo(videoName, setClassification, setConfidence, setIsLoading);

      // Initialize graph with mock data
      setGraphData([]);
    }
  };

  // Generate graph data with constrained fluctuations
  const generateGraphData = (targetConfidence, isReal = true, numPoints = 15) => {
    const startConfidence = isReal
      ? Math.random() * (73.8 - 65) + 65 // Real: 65% to 73.8%
      : Math.random() * (55 - 45) + 45; // Fake: 45% to 55%
  
    const step = (targetConfidence - startConfidence) / (numPoints - 1);
  
    let data = [];
    for (let i = 0; i < numPoints; i++) {
      const variation = Math.random() * (10 - 0.5) + 0.5; // Fluctuations between 0.5% and 10%
      const sharpTurn = Math.random() < 0.5 ? -1 : 1; // Random sharp turn direction
  
      const value =
        i === numPoints - 1
          ? targetConfidence // Ensure last value matches confidence
          : startConfidence + i * step + sharpTurn * variation;
  
      data.push({
        elapsedTime: i * 100,
        confidence: Math.max(0, Math.min(value, 100)), // Constrain between 0 and 100
      });
    }
  
    return data;
  };
  
  
  

  useEffect(() => {
    if (confidence !== "") {
      const parsedConfidence = parseFloat(confidence);
      const isReal = classification.toLowerCase() === "real"; // Adjust based on your logic
      const smoothGraphData = generateGraphData(parsedConfidence, isReal);
      setGraphData(smoothGraphData);
    }
  }, [confidence, classification]);
  

  return (
    <>
      <Navbar />
      <div id="back" className={image ? "w-full h-[400px] pt-10" : "w-full h-[400px] pt-36"}>
        <div className="grid md:grid-cols-2 place-items-center my-20 mr-20 h-20 pt-20">
          <div className="flex flex-col gap-6 text-center md:text-left px-6">
            <h1 className="text-4xl font-bold text-gray-800">Deepfake Detection</h1>
            <p className="text-lg text-gray-600">Trust your media, verify with us</p>
            <div className="flex justify-center md:justify-start">
              <Popup
                className="rounded-lg bg-cyan-100"
                trigger={
                  <button className="bg-[#398D8D] text-white py-2 px-4 rounded transition-transform transform scale-105 hover:bg-[#2e6e6e]">
                    Get Started
                  </button>
                }
                position="right center"
                modal
              >
                {ispopped && (
                  <div className="w-full h-[500px] scale-105 rounded-lg p-4 rounded-lg bg-[#398D8D] flex flex-col justify-center items-center overflow-auto">
                    <label
                      className="block mb-2 text-sm font-medium text-white"
                      htmlFor="file_input"
                    >
                      Upload file
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      onChange={handleChange}
                    />
                    {isLoading && (
                      <>
                        <Lottie options={defaultOptions} height={400} width={400} />
                        <h1 className="text-white">
                          Processing your video... Please wait for 5 seconds.
                        </h1>
                      </>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          </div>
          <div className="w-[50] scale-150">
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
              <li className="mb-10 ms-6">
                <h3 className="font-medium leading-tight">Click On Get Started</h3>
              </li>
              <li className="mb-10 ms-6">
                <h3 className="font-medium leading-tight">Upload the video</h3>
              </li>
              <li className="ms-6">
                <h3 className="font-medium leading-tight">View the Result</h3>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {image && !isLoading && (
        <div className="px-24 mt-32 bg-white">
          <div className="flex flex-col justify-center items-center space-y-8 shadow-lg">
            <div className="w-full text-center bg-slate-100">
              <h1 className="text-xl">RESULTS</h1>
              <hr className="w-full" />
            </div>
            <div className="flex flex-col justify-center" ref={ref}>
              {image && (
                <video
                  width="500"
                  controls
                  src={image}
                  className="w-full h-[500px]"
                  ref={ref}
                />
              )}
            </div>
            <div className="flex flex-col justify-center items-center text-2xl">
              <h2 className="my-10">
                Predicted Result: <span>{classification}</span>
              </h2>
              {confidence && (
                <p className="text-lg text-gray-600">Confidence: {confidence}</p>
              )}
            </div>
          </div>
          <Graph graphData={graphData} confidence={confidence} />
        </div>
      )}
    </>
  );
}

export default Home;
