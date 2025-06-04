# AI Mock Interview Platform

A React-based web application that allows users to practice job interviews with an AI interviewer. This platform provides a realistic interview experience, real-time feedback, and helps users improve their interview skills.

## Features

- AI-powered mock interviews for various job roles
- Customizable interview settings (role, difficulty, duration)
- Voice recognition for natural conversation
- Real-time feedback on responses
- Interview history and performance tracking
- Responsive design for all devices

## Tech Stack

- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- Framer Motion for animations
- React Speech Recognition for voice input
- Mock AI service (can be replaced with real OpenAI/Gemini integration)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-mock-interview.git
   cd ai-mock-interview
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Deployment

### Build for production

```bash
npm run build
```

This will generate a `dist` folder with production-ready files.

### Deploy to Netlify

1. Create a Netlify account at [netlify.com](https://www.netlify.com/)
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Login to Netlify:
   ```bash
   netlify login
   ```
4. Deploy the site:
   ```bash
   netlify deploy --prod
   ```

## Integrating with Real AI Services

### OpenAI Integration

1. Create an account at [OpenAI](https://openai.com)
2. Get an API key from the OpenAI dashboard
3. Create a `.env` file in the project root:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```
4. Update the `aiService.ts` file with the actual OpenAI implementation

### Google Gemini Integration

1. Create a Google Cloud account
2. Enable the Gemini API and get an API key
3. Create a `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Install the Gemini SDK:
   ```bash
   npm install @google/generative-ai
   ```
5. Update the `aiService.ts` file with the Gemini implementation

## Running in Visual Studio Code

1. Open the project folder in VS Code:
   ```bash
   code .
   ```

2. Install recommended extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense

3. Open a terminal in VS Code (Ctrl+` or Terminal > New Terminal)

4. Run the development server:
   ```bash
   npm run dev
   ```

## License

MIT