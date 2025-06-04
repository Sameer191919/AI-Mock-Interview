import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Save } from 'lucide-react';
import { useInterview } from '../context/InterviewContext';

const Settings = () => {
  const { selectedRole, setSelectedRole, difficultyLevel, setDifficultyLevel, duration, setDuration } = useInterview();
  
  const [localRole, setLocalRole] = useState(selectedRole);
  const [localDifficulty, setLocalDifficulty] = useState(difficultyLevel);
  const [localDuration, setLocalDuration] = useState(duration);
  const [isSaved, setIsSaved] = useState(false);
  
  const roles = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'UX Designer',
    'Marketing Manager',
    'Sales Representative',
    'Customer Support',
    'Human Resources',
    'Project Manager',
    'Business Analyst',
    'Finance Analyst',
  ];
  
  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];
  const durations = [5, 10, 15, 20, 30, 45, 60];
  
  const handleSaveSettings = () => {
    setSelectedRole(localRole);
    setDifficultyLevel(localDifficulty);
    setDuration(localDuration);
    
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Interview Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Customize your interview experience to match your specific needs and goals.
        </p>
        
        <div className="space-y-8">
          {/* Job Role Selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Job Role</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {roles.map((role) => (
                <div
                  key={role}
                  onClick={() => setLocalRole(role)}
                  className={`cursor-pointer rounded-lg border p-3 flex items-center ${
                    localRole === role
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {localRole === role && <Check size={16} className="mr-2 text-blue-500" />}
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Difficulty Level */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Difficulty Level</h2>
            <div className="flex flex-wrap gap-3">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setLocalDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-full ${
                    localDifficulty === difficulty
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
          
          {/* Interview Duration */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Interview Duration</h2>
            <div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={localDuration}
                onChange={(e) => setLocalDuration(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-gray-600 dark:text-gray-400 text-sm">
                {durations.map((d) => (
                  <span
                    key={d}
                    className={`${localDuration === d ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                  >
                    {d}m
                  </span>
                ))}
              </div>
              <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
                Selected duration: <span className="font-semibold text-blue-600 dark:text-blue-400">{localDuration} minutes</span>
              </p>
            </div>
          </div>
          
          {/* AI Model Selection - Future implementation */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">AI Model Settings</h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                The free version uses our standard AI model. Upgrade to access premium models with more specialized interview questions.
              </p>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSaveSettings}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
            >
              <Save size={20} className="mr-2" />
              Save Settings
            </button>
            
            {isSaved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center text-green-600 dark:text-green-400"
              >
                Settings saved successfully!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;