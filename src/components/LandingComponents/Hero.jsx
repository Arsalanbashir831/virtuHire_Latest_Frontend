import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImage from '../../assets/hero.png'

const Hero = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 h-screen flex flex-col md:flex-row items-center justify-center text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center md:text-left mb-10 md:mb-0 md:w-1/2"
      >
        <h1 className="text-5xl font-bold mb-4">AI Smart Recruitment System</h1>
        <p className="text-xl mb-6">Revolutionizing hiring with cutting-edge AI technology</p>
        <div className="space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-green-500 py-2 px-4 rounded-full"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-transparent border border-white py-2 px-4 rounded-full"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 border-none"
      >
        <img
          src={heroImage}
          alt="AI Recruitment"
          className="w-full h-auto border-none rounded-lg "
        />
      </motion.div>
    </div>
  );
};

export default Hero;
