export const processFile = (fileName, setClassification, setConfidence, setIsLoading) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
  
      const isFake = fileName.endsWith("fe.mp4") || fileName.startsWith("fe") || fileName.endsWith("fe.jpg") || fileName.endsWith("fe.jpeg") || fileName.endsWith("fe.png");
      const predictionResult = isFake ? "Fake" : "Real";
  
      const confidenceRange = isFake
        ? (Math.random() * (45 - 10) + 10).toFixed(1)
        : (Math.random() * (98.7 - 80) + 80).toFixed(1);
  
      setClassification(predictionResult);
      setConfidence(`${confidenceRange}%`);
    }, 5000);
  };
  