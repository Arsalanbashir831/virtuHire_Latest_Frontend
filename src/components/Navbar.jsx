import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import companyLogo from '../assets/logo.png'; // Ensure the path to your logo is correct
import { Link, useLocation } from 'react-router-dom';

// Define navigation links
const navLinks = [
  { name: 'Jobs', href: '/jobs' },
  { name: 'Applied Job', href: '/applied' },
  { name: 'Hire', href: '/hire' },
  { name: 'AI Interview', href: '/AIQA' },
  {name :"Chats" , href:'/chats'}
];

// Define user dropdown menu items
const userMenuItems = [
  { key: 'profile', label: 'Profile'  },
  { key: 'logout', label: 'Logout' }
];

const handleLogout = () => {
  localStorage.clear();
};
const userDropdownMenu = (
  <Menu>
    {userMenuItems.map((item) => (
      <Menu.Item key={item.key}>
        {item.key === 'logout' ? (
          <Link to="/login" onClick={handleLogout}>
            {item.label}
          </Link>
        ) : (
          <Link to={`/${item.key}`}>{item.label}</Link>
        )}
      </Menu.Item>
    ))}
  </Menu>
)

const ResponsiveNavBar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const location = useLocation(); // Get current location from react-router-dom

  const mobileMenuVariants = {
    open: { x: 0, opacity: 1, display: 'block' },
    closed: { x: "-100%", opacity: 0, transitionEnd: { display: 'none' } },
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const NavLink = ({ name, href }) => {
    const isActive = location.pathname === href; // Check if current path matches the href
    const activeStyle = isActive ? 'text-green-500 underline' : 'text-gray-700 hover:text-green-500';

    return (
      <Link to={href} className={`py-5 px-3 ${activeStyle}`}>
        {name}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={'/'}>   <img src={companyLogo} alt="Company Logo" className="w-24 h-auto mr-4" /></Link>
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => (
                <NavLink key={link.name} name={link.name} href={link.href} />
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Dropdown overlay={userDropdownMenu} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()} className="ant-dropdown-link" href="#">
                <UserOutlined /> <DownOutlined />
              </a>
            </Dropdown>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              <MenuOutlined />
            </button>
          </div>
        </div>
      </div>
      <motion.div
        initial="closed"
        animate={isMobileMenuVisible ? "open" : "closed"}
        variants={mobileMenuVariants}
        transition={{ duration: 0.3 }}
        className="md:hidden lg:hidden absolute top-16 left-0 w-full bg-white z-20"
      >
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="block py-2 px-4 text-sm hover:bg-gray-200">
            {link.name}
          </a>
        ))}
        <div className=" px-5 md:flex items-center space-x-3">
          <Dropdown overlay={userDropdownMenu} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()} className="ant-dropdown-link" href="#">
              <UserOutlined /> <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </motion.div>
    </nav>
  );
};

export default ResponsiveNavBar;
