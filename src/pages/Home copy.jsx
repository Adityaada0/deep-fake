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

      // Mock graph data initialization
      const mockData = Array.from({ length: 50 }, (_, i) => ({
        elapsedTime: i * 100,
        confidence: Math.floor(Math.random() * 100) + 1,
      }));
      setGraphData(mockData);
    }
  };

  // Utility function to limit and update graph data
  const updateGraphData = (data, newConfidence, maxPoints = 15) => {
    const lastElapsedTime =
      data.length > 0 ? data[data.length - 1].elapsedTime + 100 : 0;

    const updatedData = [...data, { elapsedTime: lastElapsedTime, confidence: newConfidence }];
    return updatedData.slice(-maxPoints);
  };

  useEffect(() => {
    if (confidence !== "") {
      setGraphData((prevData) => updateGraphData(prevData, parseFloat(confidence)));
    }
  }, [confidence]);

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
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg className="w-5" fill="#787373" viewBox="0 0 1920 1920">
                    <path d="M114.063 276v1368.756H0V276h114.063Zm739.106 73.765 80.642 80.642-473.02 473.02H1920v113.948H460.792l473.02 473.02-80.643 80.642-610.694-610.693 610.694-610.58Z" fillRule="evenodd"></path>
                  </svg>
                </span>
                <h3 className="font-medium leading-tight">Click On Get Started</h3>
              </li>
              <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg className="w-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 15.75C12.4142 15.75 12.75 15.4142 12.75 15V4.02744L14.4306 5.98809C14.7001 6.30259 15.1736 6.33901 15.4881 6.06944C15.8026 5.79988 15.839 5.3264 15.5694 5.01191L12.5694 1.51191C12.427 1.34567 12.2189 1.25 12 1.25C11.7811 1.25 11.573 1.34567 11.4306 1.51191L8.43056 5.01191C8.16099 5.3264 8.19741 5.79988 8.51191 6.06944C8.8264 6.33901 9.29988 6.30259 9.56944 5.98809L11.25 4.02744L11.25 15C11.25 15.4142 11.5858 15.75 12 15.75Z"
                      fill="#757575"
                    ></path>
                    <path
                      d="M16 9C15.2978 9 14.9467 9 14.6945 9.16851C14.5853 9.24148 14.4915 9.33525 14.4186 9.44446C14.25 9.69667 14.25 10.0478 14.25 10.75L14.25 15C14.25 16.2426 13.2427 17.25 12 17.25C10.7574 17.25 9.75004 16.2426 9.75004 15L9.75004 10.75C9.75004 10.0478 9.75004 9.69664 9.58149 9.4444C9.50854 9.33523 9.41481 9.2415 9.30564 9.16855C9.05341 9 8.70227 9 8 9C5.17157 9 3.75736 9 2.87868 9.87868C2 10.7574 2 12.1714 2 14.9998V15.9998C2 18.8282 2 20.2424 2.87868 21.1211C3.75736 21.9998 5.17157 21.9998 8 21.9998H16C18.8284 21.9998 20.2426 21.9998 21.1213 21.1211C22 20.2424 22 18.8282 22 15.9998V14.9998C22 12.1714 22 10.7574 21.1213 9.87868C20.2426 9 18.8284 9 16 9Z"
                      fill="#757575"
                    ></path>
                  </svg>
                </span>
                <h3 className="font-medium leading-tight">Upload the video</h3>
              </li>
              <li className="ms-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg
                    className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                  </svg>
                </span>
                <h3 className="font-medium leading-tight">View the Result</h3>
              </li>
            </ol>
          </div>
          <div className="w-[50] scale-150">
            {/* Instructions go here */}
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
          {/* Render Graph */}
          <Graph graphData={graphData} confidence={confidence} />
        </div>
      )}
    </>
  );
}

export default Home;
