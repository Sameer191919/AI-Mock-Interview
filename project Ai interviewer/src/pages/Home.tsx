import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Lightbulb, BarChart, Award } from 'lucide-react';
import { useInterview } from '../context/InterviewContext';

const Home = () => {
  const { setSelectedRole } = useInterview();

  const popularRoles = [
    { title: 'Software Engineer', color: 'bg-blue-500' },
    { title: 'Product Manager', color: 'bg-purple-500' },
    { title: 'Data Scientist', color: 'bg-green-500' },
    { title: 'UX Designer', color: 'bg-orange-500' },
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'AI-Powered Interviews',
      description:
        'Practice with our advanced AI interviewer that adapts to your responses and provides realistic interview scenarios.',
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: 'Personalized Feedback',
      description:
        'Receive detailed feedback on your interview performance, including suggestions for improvement and strengths.',
    },
    {
      icon: <BarChart className="w-8 h-8 text-green-500" />,
      title: 'Progress Tracking',
      description:
        'Monitor your improvement over time with detailed analytics and performance metrics across multiple interviews.',
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: 'Industry-Specific Questions',
      description:
        'Practice with questions tailored to your target role and industry, from technical to behavioral interviews.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16"
    >
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white"
              >
                Master Your Interview Skills with AI
              </motion.h1>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              >
                Practice with our AI-powered mock interviews, get real-time feedback, and land your dream job.
              </motion.p>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/interview"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
                >
                  Start Interview <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link
                  to="/settings"
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
                >
                  Customize Settings
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                src="https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Virtual Interview"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Roles Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Popular Interview Roles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              >
                <div className={`h-2 ${role.color}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{role.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Practice interviews specific to {role.title} roles and stand out from other candidates.
                  </p>
                  <Link
                    to="/interview"
                    onClick={() => setSelectedRole(role.title)}
                    className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
                  >
                    Start Practice <ArrowRight className="ml-1" size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why Choose InterviewAI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Start practicing today and build the confidence you need to succeed.
          </p>
          <Link
            to="/interview"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg inline-flex items-center transition duration-300"
          >
            Start Free Practice <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;