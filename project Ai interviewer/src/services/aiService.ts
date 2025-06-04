// This is a simplified mock AI service
// In a real app, you would connect to OpenAI, Google Gemini, or another AI API

interface AIRequestOptions {
  temperature?: number;
  maxTokens?: number;
}

// Mock responses for different types of queries
const mockResponses = {
  questions: [
    "Tell me about your experience with React and other frontend frameworks.",
    "How do you handle state management in complex applications?",
    "Describe a challenging technical problem you've solved recently.",
    "How do you approach testing your code?",
    "Can you explain how you've implemented CI/CD in your previous projects?",
    "What's your experience with cloud services?",
    "How do you stay updated with the latest technology trends?",
    "Describe your ideal development workflow.",
    "How do you handle technical disagreements within a team?",
    "What's your approach to code reviews?"
  ],
  feedback: [
    "Good answer, but you could provide more specific examples from your experience.",
    "Well structured response. I appreciate the detail you provided on your technical approach.",
    "That's a solid answer. Consider mentioning metrics or results when describing your accomplishments.",
    "Good perspective. It would be helpful to hear how you've applied this knowledge in real projects.",
    "Interesting approach. You might want to elaborate on the trade-offs of this solution."
  ],
  summaries: [
    "You demonstrated good technical knowledge and communication skills. Your answers were well-structured and showed problem-solving ability. To improve, consider providing more concrete examples and metrics when discussing your achievements. Score: 82/100",
    "Strong interview performance with clear articulation of complex concepts. You showed good depth in technical areas and highlighted teamwork skills effectively. Focus on being more concise in some responses. Score: 88/100",
    "You provided thoughtful answers that demonstrated your experience. Your technical knowledge is solid, though some answers could benefit from more specific implementation details. Score: 75/100"
  ]
};

// A simple function to determine which type of response to return
const categorizePrompt = (prompt: string): 'questions' | 'feedback' | 'summaries' => {
  if (prompt.includes('Ask') || prompt.includes('question')) {
    return 'questions';
  } else if (prompt.includes('feedback') || prompt.includes('constructive')) {
    return 'feedback';
  } else {
    return 'summaries';
  }
};

// This simulates a delay like an actual API call would have
const simulateApiDelay = (): Promise<void> => {
  const delayTime = Math.floor(Math.random() * 1500) + 500; // Between 500-2000ms
  return new Promise(resolve => setTimeout(resolve, delayTime));
};

/**
 * Get a response from the AI service
 * In a real implementation, this would call OpenAI, Google Gemini, etc.
 */
export const getAIResponse = async (
  prompt: string,
  options: AIRequestOptions = {}
): Promise<string> => {
  try {
    console.log('AI request:', prompt);
    
    // Simulate network delay
    await simulateApiDelay();
    
    // Determine what type of response to give based on the prompt
    const category = categorizePrompt(prompt);
    const responses = mockResponses[category];
    
    // Get a random response from the appropriate category
    const randomIndex = Math.floor(Math.random() * responses.length);
    
    // In a real implementation, you would use the OpenAI API like this:
    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ role: "user", content: prompt }],
    //   temperature: options.temperature || 0.7,
    //   max_tokens: options.maxTokens || 200,
    // });
    // return response.choices[0].message.content;
    
    return responses[randomIndex];
  } catch (error) {
    console.error('Error getting AI response:', error);
    return "I'm sorry, I encountered an error processing your request. Please try again.";
  }
};

/**
 * SETUP INSTRUCTIONS FOR REAL IMPLEMENTATION:
 * 
 * 1. For OpenAI:
 *    - npm install openai
 *    - Create a free tier account at openai.com
 *    - Generate an API key
 *    - Use the provided commented code above
 * 
 * 2. For Google Gemini:
 *    - npm install @google/generative-ai
 *    - Create a Google Cloud account
 *    - Enable the Gemini API and get an API key
 *    - Follow Google's documentation for implementation
 * 
 * 3. Configure environment variables:
 *    - Create a .env file with your API keys
 *    - Add VITE_OPENAI_API_KEY or VITE_GEMINI_API_KEY
 *    - Access with import.meta.env.VITE_OPENAI_API_KEY
 */