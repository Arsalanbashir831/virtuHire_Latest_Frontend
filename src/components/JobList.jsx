import React from 'react';
import { Card, Tag, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { selectedJobState } from '../atoms/JobState';

// Sample job data
const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Lumina Datamatics',
    type:"Part Time",
    rating: 4.5,
    location: 'Remote',
    postedDate: '3 days ago',
    responsibilities: 'Translate designs into high-quality code, optimize components for maximum performance, lead and mentor junior developers...',
    experience: 'At least 5 years experience in frontend development, proficiency in React, understanding of Redux and TypeScript...',
    skills: ['JavaScript', 'React', 'Redux', 'TypeScript', 'HTML/CSS', 'Git'],
  },
  {
    id: 2,
    title: 'Senior Frontend Developer',
    company: 'Lumina Datamatics',
    type:"Full Time",
    rating: 4.5,
    location: 'Remote',
    postedDate: '3 days ago',
    responsibilities: 'Translate designs into high-quality code, optimize components for maximum performance, lead and mentor junior developers...',
    experience: 'At least 5 years experience in frontend development, proficiency in React, understanding of Redux and TypeScript...',
    skills: ['JavaScript', 'React', 'Redux', 'TypeScript', 'HTML/CSS', 'Git'],
  }

];

const JobCard = ({job, selectJob }) => {
  return (
    <Card onClick={() => selectJob(job)} className="mb-4 cursor-pointer">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
        <ClockCircleOutlined className="text-gray-500" /> <span className="ml-1 text-gray-500">{job.postedDate}</span>
          <h3 className="text-lg font-bold">{job.title}</h3>
          <p className="text-gray-600">{job.company} - <span className="text-gray-500">{job.location}</span></p>
          <div className="flex mt-2">
            <Tag color="blue">{job.type}</Tag>
          </div>
          <p className="text-gray-600 mt-2">{job.responsibilities.length > 100 ? job.responsibilities.slice(0, 100)+"..." : job.responsibilities}</p>

        </div>
       
         
        
      </div>
      <div className='w-full text-right'>
        <Button  className="mr-2" style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}>Easy Apply</Button>
      </div>
    </Card>
  );
};

const JobList = () => {
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobState);
  const handleCardClick = (job) => {
    setSelectedJob(job);
  };
  return (
    <div className="container mx-auto px-4 my-5">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} selectJob={handleCardClick} />
      ))}
    </div>
  );
};

export default JobList;
