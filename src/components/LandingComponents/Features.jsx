import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaClipboardList, FaRobot, FaChartLine } from 'react-icons/fa';

const features = [
  {
    icon: <FaRocket />,
    title: 'Easy Apply',
    description: 'Quick and easy application process for candidates.',
  },
  {
    icon: <FaClipboardList />,
    title: 'Easy Job Posting',
    description: 'Simplified job posting process for employers.',
  },
  {
    icon: <FaRobot />,
    title: 'AI Mock Online Interview',
    description: 'Conduct mock interviews with our AI-driven system.',
  },
  {
    icon: <FaChartLine />,
    title: 'Candidate Ranker',
    description: 'Rank candidates efficiently using AI and ML models.',
  },
];

const Features = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold mb-12"
        >
          Core Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-4xl text-teal-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
