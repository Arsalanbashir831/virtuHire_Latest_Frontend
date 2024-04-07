import React from 'react'
import ResponsiveNavBar from '../components/Navbar'
import { Card, Button, Rate } from 'antd';
import { ClockCircleOutlined,ThunderboltOutlined } from '@ant-design/icons';
import ResponsiveSearchBar from '../components/Search';
import JobList from '../components/JobList';
import  { JobDetail } from '../components/JobDetails';


const Home = () => {
      
  return (
   <>
   
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
    <JobDetail />
    </div>
    </div>
   </>
  )
}

export default Home