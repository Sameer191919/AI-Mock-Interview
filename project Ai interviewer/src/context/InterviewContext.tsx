import { createContext, useContext, useState, ReactNode } from 'react';

interface InterviewSession {
  id: string;
  role: string;
  date: Date;
  questions: {
    question: string;
    answer: string;
    feedback?: string;
  }[];
  duration: number;
  score?: number;
}

interface InterviewContextType {
  sessions: InterviewSession[];
  currentSession: InterviewSession | null;
  selectedRole: string;
  difficultyLevel: string;
  duration: number;
  addSession: (session: InterviewSession) => void;
  updateCurrentSession: (session: InterviewSession) => void;
  startNewSession: (role: string, difficultyLevel: string, duration: number) => void;
  setSelectedRole: (role: string) => void;
  setDifficultyLevel: (level: string) => void;
  setDuration: (minutes: number) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('Software Engineer');
  const [difficultyLevel, setDifficultyLevel] = useState<string>('Medium');
  const [duration, setDuration] = useState<number>(15);

  const addSession = (session: InterviewSession) => {
    setSessions((prevSessions) => [...prevSessions, session]);
  };

  const updateCurrentSession = (session: InterviewSession) => {
    setCurrentSession(session);
  };

  const startNewSession = (role: string, difficultyLevel: string, duration: number) => {
    const newSession: InterviewSession = {
      id: Date.now().toString(),
      role,
      date: new Date(),
      questions: [],
      duration,
    };
    setCurrentSession(newSession);
    addSession(newSession);
  };

  return (
    <InterviewContext.Provider
      value={{
        sessions,
        currentSession,
        selectedRole,
        difficultyLevel,
        duration,
        addSession,
        updateCurrentSession,
        startNewSession,
        setSelectedRole,
        setDifficultyLevel,
        setDuration,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};