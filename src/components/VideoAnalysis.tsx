import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

interface VideoAnalysisProps {
  onExpressionChange?: (expression: string) => void;
}

const VideoAnalysis = ({ onExpressionChange }: VideoAnalysisProps) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]);
        setIsModelLoaded(true);
      } catch (error) {
        console.error('Error loading face-api models:', error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const analyzeExpressions = async () => {
      if (!webcamRef.current || !canvasRef.current || !isModelLoaded) return;

      const video = webcamRef.current.video;
      if (!video) return;

      const canvas = canvasRef.current;
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections && detections[0]) {
        const expressions = detections[0].expressions;
        const dominantExpression = Object.entries(expressions).reduce((a, b) => 
          a[1] > b[1] ? a : b
        )[0];
        
        onExpressionChange?.(dominantExpression);

        // Draw detections
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      }

      animationFrame = requestAnimationFrame(analyzeExpressions);
    };

    if (isModelLoaded) {
      analyzeExpressions();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isModelLoaded, onExpressionChange]);

  return (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        className="rounded-lg"
        mirrored
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user"
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 z-10"
      />
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <div className="text-white">Loading face detection models...</div>
        </div>
      )}
    </div>
  );
};

export default VideoAnalysis;