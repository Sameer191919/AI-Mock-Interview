import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">InterviewAI</h3>
            <p className="text-gray-300">
              Practice your interview skills with our AI-powered mock interview platform.
              Get real-time feedback and improve your chances of landing your dream job.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="/interview" className="hover:text-blue-400 transition">Start Interview</a></li>
              <li><a href="/history" className="hover:text-blue-400 transition">Interview History</a></li>
              <li><a href="/settings" className="hover:text-blue-400 transition">Settings</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin size={24} />
              </a>
            </div>
            <p className="text-gray-300">
              Email us: <a href="mailto:contact@interviewai.com" className="text-blue-400 hover:underline">contact@interviewai.com</a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;