import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobList from '../components/JobList';
import { JobDetail } from '../components/JobDetails';

const Hire = () => {
  // Use useEffect with an empty dependency array to reload the component on mount
  useEffect(() => {
    // Place any reload logic here (e.g., fetching updated data or resetting state)
    console.log('Component mounted and reloaded.');
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-end items-center mb-4">
        <Link to="/jobpost" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add New Job
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <JobList isrecruiter={true} />
        <div className="col-span-2">
          <JobDetail isRecruiter={true} />
        </div>
      </div>
    </div>
  );
};

export default Hire;
