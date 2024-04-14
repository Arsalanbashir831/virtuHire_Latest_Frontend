import React, { useRef, useEffect, useState } from 'react';
import ml5 from 'ml5';

const PostureCorrection = () => {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState("Click 'Start Video' to begin.");

  useEffect(() => {
    let poseNet;
    let videoStream;

    const enablePoseNet = () => {
      poseNet = ml5.poseNet(videoRef.current, { 
        flipHorizontal: true  // considering the mirrored video
      }, () => {
        console.log('PoseNet Model Loaded');
        setFeedback("PoseNet model loaded. Start analyzing posture and face.");
      });

      poseNet.on('pose', (poses) => {
        if (poses.length > 0) {
          analyzePostureAndFace(poses[0].pose);
        } else {
          setFeedback("No poses detected.");
        }
      });
    };

    if (started) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoStream = stream;
          enablePoseNet();
        })
        .catch(err => {
          console.error("Failed to get media", err);
          setFeedback("Could not access webcam.");
        });
    } else {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      if (poseNet) {
        poseNet.removeAllListeners();
      }
      setFeedback("Click 'Start Video' to begin.");
    }

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      if (poseNet) {
        poseNet.removeAllListeners();
      }
    };
  }, [started]);

  const analyzePostureAndFace = (pose) => {
    const keypoints = pose.keypoints.reduce((map, obj) => {
        map[obj.part] = obj;
        return map;
    }, {});

    // Basic face detection
    const faceDetected = keypoints.leftEye && keypoints.rightEye && keypoints.nose;
    const faceFeedback = faceDetected ? "Face detected." : "No face detected.";

    // Posture analysis for shoulders
    let postureFeedback = "Good posture!";
    const shoulderLevelDiff = Math.abs(keypoints.leftShoulder.position.y - keypoints.rightShoulder.position.y);
    
    if (shoulderLevelDiff > 5) {  // Adjust threshold based on sensitivity requirements
        postureFeedback = "Please sit straight.";
    }

    // Posture analysis for head
    if (keypoints.leftEye && keypoints.rightEye) {
        const eyeLevelDiff = Math.abs(keypoints.leftEye.position.y - keypoints.rightEye.position.y);
        if (eyeLevelDiff > 1) {  // Adjust threshold based on sensitivity requirements
            postureFeedback = `${postureFeedback} Keep your head straight.`;
        }
    }

    setFeedback(`${faceFeedback} ${postureFeedback}`);
};


  const toggleVideo = () => {
    setStarted(!started);
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-gray-100 w-full mx-auto">
      <div className="relative w-full max-w-lg mb-4">
        <video ref={videoRef} width="100%" autoPlay muted playsInline className={`rounded-lg ${started ? '' : 'hidden'}`}></video>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600" onClick={toggleVideo}>
          {started ? 'Stop Video' : 'Start Video'}
        </button>
      </div>
      <div className="w-full text-center">
        <p className="text-lg">{feedback}</p>
      </div>
    </div>
  );
};

export default PostureCorrection;
