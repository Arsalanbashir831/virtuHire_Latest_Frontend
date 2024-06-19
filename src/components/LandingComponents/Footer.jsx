import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-4">
              <a href="#" className="hover:text-gray-400">Home</a>
              <a href="#" className="hover:text-gray-400">Jobs</a>
              <a href="#" className="hover:text-gray-400">About Us</a>
              <a href="#" className="hover:text-gray-400">Contact</a>
              {/* Add more links as needed */}
            </div>
          </div>
          
          {/* Right Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400 mb-2">123 Street, City</p>
            <p className="text-gray-400 mb-2">contact@example.com</p>
            <p className="text-gray-400 mb-2">+123 456 7890</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-400"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white hover:text-gray-400"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white hover:text-gray-400"><i className="fab fa-linkedin-in"></i></a>
            {/* Add more social media icons as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
