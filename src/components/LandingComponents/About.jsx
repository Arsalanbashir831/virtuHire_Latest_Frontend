import React from 'react';
import { motion } from 'framer-motion';
import Testimonials from './Testimonials';

const About = () => {
  const totalRecruiters = 1500; // Example data, replace with real data
  const totalCandidates = 5000; // Example data, replace with real data

  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-600 py-16 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-center mb-12"
        >
          About Our Product
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-xl text-gray-100 text-center mb-8"
        >
          Our AI Smart Recruitment System leverages cutting-edge machine learning and NLP models to streamline the hiring process for both recruiters and candidates. With features like easy job posting, AI mock interviews, and candidate ranking, we make recruitment efficient and effective.
        </motion.p>
        <div className="flex flex-col md:flex-row justify-around items-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="text-center mb-8 md:mb-0"
          >
            <h3 className="text-5xl font-bold">{totalRecruiters}</h3>
            <p className="text-gray-200">Recruiters Joined</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-5xl font-bold">{totalCandidates}</h3>
            <p className="text-gray-200">Candidates Joined</p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Testimonials />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
