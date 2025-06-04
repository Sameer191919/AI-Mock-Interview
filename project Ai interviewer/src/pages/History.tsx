import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Calendar, Clock, Award } from 'lucide-react';
import { useInterview } from '../context/InterviewContext';

const History = () => {
  const { sessions } = useInterview();
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const toggleExpand = (sessionId: string) => {
    if (expandedSession === sessionId) {
      setExpandedSession(null);
    } else {
      setExpandedSession(sessionId);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Generate a random score for demo purposes
  const getRandomScore = () => {
    return Math.floor(Math.random() * 31) + 70; // Score between 70-100
  };

  if (sessions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Interview History</h1>
          <div className="py-12">
            <div className="inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300 mb-4">
              <Calendar size={32} />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-700 dark:text-gray-200">No interviews yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your completed interviews will appear here. Start a new interview to begin building your history.
            </p>
            <a
              href="/interview"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Start Your First Interview
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Interview History</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Review your past interviews to track your progress and identify areas for improvement.
        </p>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => toggleExpand(session.id)}
              >
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{session.role} Interview</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(session.date)}</span>
                      <Clock size={14} className="ml-3 mr-1" />
                      <span>{session.duration} min</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Score:</span>
                    <span className="ml-1 font-bold text-blue-600 dark:text-blue-400">{session.score || getRandomScore()}/100</span>
                  </div>
                  {expandedSession === session.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {expandedSession === session.id && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Questions & Answers</h4>
                  <div className="space-y-4">
                    {session.questions.map((qa, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="mb-2">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">Question {index + 1}</span>
                          <p className="font-medium text-gray-800 dark:text-white">{qa.question}</p>
                        </div>
                        <div className="mb-2">
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase">Your Answer</span>
                          <p className="text-gray-700 dark:text-gray-300">{qa.answer}</p>
                        </div>
                        {qa.feedback && (
                          <div>
                            <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 uppercase">Feedback</span>
                            <p className="text-gray-700 dark:text-gray-300">{qa.feedback}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default History;