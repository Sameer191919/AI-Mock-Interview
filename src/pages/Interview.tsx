// Update the imports section at the top
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, RefreshCw, Clock, Video, VideoOff } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useInterview } from '../context/InterviewContext';
import { getAIResponse } from '../services/aiService';
import VideoAnalysis from '../components/VideoAnalysis';

// Add this inside the Interview component, after the existing state declarations
const [isVideoEnabled, setIsVideoEnabled] = useState(false);
const [currentExpression, setCurrentExpression] = useState('');

// Add this inside the return statement, before the chat area
{isInterviewStarted && (
  <div className="mb-4">
    <button
      onClick={() => setIsVideoEnabled(!isVideoEnabled)}
      className={`p-2 rounded-md ${
        isVideoEnabled ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      {isVideoEnabled ? <VideoOff size={20} /> : <Video size={20} />}
    </button>
    {isVideoEnabled && (
      <div className="mt-4">
        <VideoAnalysis onExpressionChange={setCurrentExpression} />
        {currentExpression && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Current expression: {currentExpression}
          </p>
        )}
      </div>
    )}
  </div>
)}