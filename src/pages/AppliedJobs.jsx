import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils';
import axios from 'axios'

const AppliedJobs = () => {
  // Sample data for applied jobs (replace with your actual data)
const [appliedResponse , setAppliedResponse] = useState(null)
const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')

useEffect(()=>{
    const fetchAppliedJobs = async ()=>{
        try {
            const response = await axios.get(`${BASE_URL}/appliedjobs/${userId}/get_jobs/`,{
                headers:{
                    Authorization:`Token ${token}`
                }
            })
            console.log(response.data);
            setAppliedResponse(response.data)
        } catch (error) {
             console.log(error);
        }
    }
    fetchAppliedJobs()
},[])



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Applied Jobs</h1>

      {appliedResponse?.length === 0 ? (
        <p className="text-center text-gray-600">You have not applied to any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedResponse?.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-lg font-bold mb-2">{job.job_details.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{job.job_details.company}</p>
              <p className="text-sm text-gray-600 mb-4">{job.job_details.location}</p>
              <div className={`text-sm font-semibold py-1 px-3 rounded ${getStatusColorClass(job.status)}`}>
                {/* {job.status} */} Pending
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
