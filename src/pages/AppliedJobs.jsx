import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd';
import { BASE_URL } from '../utils';

const AppliedJobs = () => {
  const [appliedResponse, setAppliedResponse] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/appliedjobs/${userId}/get_jobs/`, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setAppliedResponse(response.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, [userId, token]);

  const showModal = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Applied Jobs</h1>
      <p className="text-xl  text-center mb-8">Recruiters will contact you through chat if you are selected</p>
      {appliedResponse.length === 0 ? (
        <p className="text-center text-gray-600">You have not applied to any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedResponse.map((job) => (
            <div 
              key={job.id}
              onClick={() => showModal(job)}
              className="bg-white border rounded-lg shadow-md p-6 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-lg font-bold mb-2">{job.job_details.title}</h2>
              <p className="text-sm text-gray-600">{job.job_details.company} - {job.job_details.location}</p>
            </div>
          ))}
        </div>
      )}

      {selectedJob && (
        <Modal
          title={selectedJob.job_details.title}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Close
            </Button>,
          ]}
        >
          <div>
            <p className="mb-2"><strong>Company:</strong> {selectedJob.job_details.company}</p>
            <p className="mb-2"><strong>Location:</strong> {selectedJob.job_details.location}</p>
            <p className="mb-2"><strong>Description:</strong> {selectedJob.job_details.responsibilities}</p>
            <p className="mb-2"><strong>Experience Required:</strong> {selectedJob.job_details.experience}</p>
            <p className="mb-2"><strong>Skills Required:</strong> {selectedJob.job_details.skills}</p>
            <p className="mb-2"><strong>Application Date:</strong> {selectedJob.applied_date}</p>
            <p className="mb-2"><strong>Resume Link:</strong> <a href={selectedJob.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
            
            {selectedJob.avg_score > 50 ? (
              <p className="text-green-600 font-bold mt-4">Your Resume Score is above 50% There is a good chance you might get hired!</p>
            ) : (
              <p className="text-red-600 font-bold mt-4">Your Resume Score is below 50% So there is a probability you might not get hired .</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AppliedJobs;
