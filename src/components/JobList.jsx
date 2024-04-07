import React from 'react';
import { Card, Tag, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

// Sample job data
const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'Remote',
    type: 'Full Time',
    postedDate: '2 days ago',
    description: 'We are looking for a skilled frontend developer to join our team...',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'Remote',
    type: 'Full Time',
    postedDate: '2 days ago',
    description: 'We are looking for a skilled frontend developer to join our team...',
  }

];

const JobCard = ({ job }) => {
  return (
    <Card className="mb-4 cursor-pointer">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
        <ClockCircleOutlined className="text-gray-500" /> <span className="ml-1 text-gray-500">{job.postedDate}</span>
          <h3 className="text-lg font-bold">{job.title}</h3>
          <p className="text-gray-600">{job.company} - <span className="text-gray-500">{job.location}</span></p>
          <div className="flex mt-2">
            <Tag color="blue">{job.type}</Tag>
          </div>
          <p className="text-gray-600 mt-2">{job.description}</p>
        </div>
       
         
        
      </div>
      <div className='w-full text-right'>
        <Button  className="mr-2" style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}>Easy Apply</Button>
      </div>
    </Card>
  );
};

const JobList = () => {
  return (
    <div className="container mx-auto px-4 my-5">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
