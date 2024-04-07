import React from 'react';

const AppliedJobs = () => {
  // Sample data for applied jobs (replace with your actual data)
  const appliedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Web Wizards Ltd.',
      location: 'New York, NY',
      status: 'Rejected',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Minds Studio',
      location: 'San Francisco, CA',
      status: 'Accepted',
    },
    {
        id: 4,
        title: 'UI/UX Designer',
        company: 'Creative Minds Studio',
        location: 'San Francisco, CA',
        status: 'Accepted',
      },
    
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Applied Jobs</h1>

      {appliedJobs.length === 0 ? (
        <p className="text-center text-gray-600">You have not applied to any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-lg font-bold mb-2">{job.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{job.company}</p>
              <p className="text-sm text-gray-600 mb-4">{job.location}</p>
              <div className={`text-sm font-semibold py-1 px-3 rounded ${getStatusColorClass(job.status)}`}>
                {job.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Function to determine status color class based on job status
const getStatusColorClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-200 text-yellow-800';
    case 'Rejected':
      return 'bg-red-200 text-red-800';
    case 'Accepted':
      return 'bg-green-200 text-green-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export default AppliedJobs;
