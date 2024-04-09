// Assuming you have installed ml5.js in your React project
import React, { useRef, useEffect, useState } from 'react';
import ml5 from 'ml5';



const PostureCorrection = () => {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState("Let's check your posture for the interview.");

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (started && videoRef.current) {
      const poseNet = ml5.poseNet(videoRef.current, () => console.log('PoseNet Model Loaded'));
      poseNet.on('pose', (poses) => {
        if (poses.length > 0) {
          analyzePosture(poses[0].pose);
        }
      });
    }
  }, [started]);

  const analyzePosture = (pose) => {
    let newFeedback = "Good posture!";
    const shoulderLevelDiff = Math.abs(pose.leftShoulder.y - pose.rightShoulder.y);
    
    if (shoulderLevelDiff > 10) { // Threshold for shoulder level difference
      newFeedback = "Please Sit Straight";
    } else if (Math.abs(pose.leftEye.y - pose.rightEye.y) > 5) { // Threshold for eye level difference
      newFeedback = "Keep your head straight.";
    }

    setFeedback(newFeedback);
  };

  const toggleVideo = () => {
    if (started) {
      videoRef.current.pause();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setStarted(false);
      setFeedback("Let's check your posture for the interview.");
    } else {
      setStarted(true);
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch(console.error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-gray-100 w-full mx-auto">
    <div className="relative w-full max-w-lg mb-4 ">
      <video
        ref={videoRef}
        width="100%"
        autoPlay
        muted
        playsInline
        className={`rounded-lg ${started ? '' : 'hidden'}`}
      ></video>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        onClick={toggleVideo}
      >
        {started ? 'Stop Video' : 'Start Video'}
      </button>
    </div>
    <div className="w-full text-center">
      {started ? (
        <p className="text-lg">{feedback}</p>
      ) : (
        <p className="text-gray-500">Click "Start Video" to analyze posture.</p>
      )}
    </div>
  </div>
  );
};

export default PostureCorrection;
