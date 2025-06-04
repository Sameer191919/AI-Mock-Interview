import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, RefreshCw, Clock } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useInterview } from '../context/InterviewContext';
import { getAIResponse } from '../services/aiService';

const Interview = () => {
  const {
    currentSession,
    selectedRole,
    difficultyLevel,
    duration,
    startNewSession,
    updateCurrentSession,
  } = useInterview();

  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isInterviewEnded, setIsInterviewEnded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [questionNumber, setQuestionNumber] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentQuestion, currentAnswer, feedback]);

  // Timer countdown
  useEffect(() => {
    let timer: number;
    if (isInterviewStarted && !isInterviewEnded) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleEndInterview();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isInterviewStarted, isInterviewEnded]);

  // Update transcript to current answer
  useEffect(() => {
    setCurrentAnswer(transcript);
  }, [transcript]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartInterview = async () => {
    setIsInterviewStarted(true);
    setIsLoading(true);
    startNewSession(selectedRole, difficultyLevel, duration);
    
    try {
      const firstQuestion = await getAIResponse(
        `You are an interviewer for a ${selectedRole} position. Ask the first interview question for a ${difficultyLevel.toLowerCase()} difficulty level.`
      );
      setCurrentQuestion(firstQuestion);
    } catch (error) {
      console.error('Error getting first question:', error);
      setCurrentQuestion('What makes you a good fit for this role?');
    }
    
    setIsLoading(false);
  };

  const handleNextQuestion = async () => {
    if (!currentSession) return;
    
    setIsLoading(true);

    // Save current Q&A
    const updatedSession = { 
      ...currentSession,
      questions: [
        ...currentSession.questions,
        {
          question: currentQuestion,
          answer: currentAnswer,
          feedback: feedback
        }
      ]
    };
    updateCurrentSession(updatedSession);

    // Get feedback on the answer
    try {
      const feedbackResponse = await getAIResponse(
        `You are an interviewer for a ${selectedRole} position. Provide brief constructive feedback on this answer: "${currentAnswer}" to the question: "${currentQuestion}"`
      );
      setFeedback(feedbackResponse);
    } catch (error) {
      console.error('Error getting feedback:', error);
      setFeedback('Your answer was well structured. Consider providing more specific examples in your next response.');
    }

    // Get next question
    try {
      const nextQuestion = await getAIResponse(
        `You are an interviewer for a ${selectedRole} position. Ask the next interview question for a ${difficultyLevel.toLowerCase()} difficulty level. This is question number ${questionNumber + 1}.`
      );
      
      setCurrentQuestion(nextQuestion);
      setQuestionNumber(prev => prev + 1);
      resetTranscript();
      setCurrentAnswer('');
      setFeedback('');
    } catch (error) {
      console.error('Error getting next question:', error);
      setCurrentQuestion('What is your greatest professional achievement?');
    }
    
    setIsLoading(false);
  };

  const handleEndInterview = async () => {
    if (!currentSession) return;
    
    // Save final Q&A if there's any
    if (currentQuestion && currentAnswer) {
      const updatedSession = { 
        ...currentSession,
        questions: [
          ...currentSession.questions,
          {
            question: currentQuestion,
            answer: currentAnswer,
            feedback: feedback
          }
        ]
      };
      updateCurrentSession(updatedSession);
    }
    
    setIsInterviewEnded(true);
    SpeechRecognition.stopListening();
    
    // Calculate score and provide summary
    try {
      const summaryResponse = await getAIResponse(
        `You are an interviewer for a ${selectedRole} position. Based on the interview, provide a brief summary and score out of 100 for the candidate.`
      );
      setFeedback(summaryResponse);
    } catch (error) {
      console.error('Error getting summary:', error);
      setFeedback('Thank you for completing the interview. Your answers showed good knowledge of the field. Score: 75/100');
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Browser Not Supported</h2>
        <p className="mb-4">
          Sorry, your browser doesn't support speech recognition. Please try using Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      {!isInterviewStarted ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Start Your Mock Interview
          </h1>
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You're about to start a mock interview for the role: <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedRole}</span>
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Interview Settings:</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>Role: {selectedRole}</li>
                <li>Difficulty: {difficultyLevel}</li>
                <li>Duration: {duration} minutes</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                You can change these settings on the Settings page before starting.
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Tips for a successful interview:</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              <li>Find a quiet place without distractions</li>
              <li>Speak clearly and at a moderate pace</li>
              <li>Structure your answers with examples</li>
              <li>Keep your answers concise (1-2 minutes)</li>
            </ul>
          </div>
          <button
            onClick={handleStartInterview}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Start Interview
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-[80vh]">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{selectedRole} Interview</h2>
              <p className="text-sm text-blue-100">Question {questionNumber}</p>
            </div>
            <div className="flex items-center bg-blue-700 px-3 py-1 rounded-full">
              <Clock size={16} className="mr-1" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-grow overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Interview start message */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                  Interview started
                </div>
              </div>

              {/* Question */}
              {currentQuestion && (
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    AI
                  </div>
                  <div className="ml-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-w-[80%]">
                    <p className="text-gray-800 dark:text-white">{currentQuestion}</p>
                  </div>
                </div>
              )}

              {/* User Answer */}
              {currentAnswer && (
                <div className="flex justify-end">
                  <div className="mr-3 bg-blue-100 dark:bg-blue-900 rounded-lg p-4 max-w-[80%]">
                    <p className="text-gray-800 dark:text-white">{currentAnswer}</p>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    You
                  </div>
                </div>
              )}

              {/* Feedback */}
              {feedback && (
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    AI
                  </div>
                  <div className="ml-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 max-w-[80%]">
                    <p className="text-gray-800 dark:text-yellow-100">{feedback}</p>
                  </div>
                </div>
              )}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-center">
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <RefreshCw className="animate-spin" size={20} />
                    <span>Loading...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            {isInterviewEnded ? (
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">Interview completed!</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                >
                  Start New Interview
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <button
                    onClick={toggleListening}
                    className={`p-3 rounded-full ${
                      listening ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'
                    }`}
                  >
                    {listening ? <MicOff size={20} /> : <Mic size={20} />}
                  </button>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {listening ? 'Listening... Click to stop' : 'Click to start speaking'}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Type your answer here or use the microphone..."
                    className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    rows={3}
                  />
                  <button
                    onClick={handleNextQuestion}
                    disabled={isLoading || !currentAnswer.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 rounded-r-lg"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => resetTranscript()}
                    className="text-gray-600 dark:text-gray-300 text-sm hover:underline"
                  >
                    Clear input
                  </button>
                  <button
                    onClick={handleEndInterview}
                    className="text-red-500 text-sm hover:underline"
                  >
                    End interview
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Interview;