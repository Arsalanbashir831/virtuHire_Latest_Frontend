import React from 'react'
import ResponsiveNavBar from '../components/Navbar'
import { Card, Button, Rate } from 'antd';
import { ClockCircleOutlined,ThunderboltOutlined } from '@ant-design/icons';
import ResponsiveSearchBar from '../components/Search';
import JobList from '../components/JobList';
import  { JobDetail } from '../components/JobDetails';


const Home = () => {
    const jobListings = [
        {
          id: 1,
          title: "Freelance Contract REMOTE Opportunity – Foundations of Strategic Communication Beta Testers Needed",
          company: "Lumina Datamatics",
          rating: 3.9,
          location: "Remote",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          postedDate: "10d",
        },
        // ... more job listings
      ];


      const jobInfo = {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Lumina Datamatics',
        rating: 4.5,
        location: 'Remote',
        postedDate: '3 days ago',
        description: 'We are looking for a senior frontend developer with a keen eye for design and a passion for creating responsive web applications...',
        responsibilities: 'Translate designs into high-quality code, optimize components for maximum performance, lead and mentor junior developers...',
        experience: 'At least 5 years experience in frontend development, proficiency in React, understanding of Redux and TypeScript...',
        skills: ['JavaScript', 'React', 'Redux', 'TypeScript', 'HTML/CSS', 'Git'],
        type:"Full Time"
      };
      
  return (
   <>
    <ResponsiveNavBar/>
    <ResponsiveSearchBar/>
    <div className='text-center flex justify-center items-center gap-2'>
    <ThunderboltOutlined className='text-xl text-blue-500'/>
        <h1 className='text-green-700 font-semibold'>Upload your resume and Easy Apply in a snap</h1>
    </div>
    <br/>
    <hr/>
    <div className='grid grid-cols-3 '>
    <JobList/>
    <div className='col-span-2'>
    <JobDetail job={jobInfo}/>
    </div>
    </div>
   </>
  )
}

export default Home