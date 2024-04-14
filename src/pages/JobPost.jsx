import React, { useState, useEffect } from 'react';
import { Form, Button, Upload, Card, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import animationData from '../assets/applyAnime.json'; // Your Lottie animation JSON file
import { NLP_SERVER,BASE_URL } from '../utils';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const { Option } = Select;


const JobPost = () => {
  const navigate = useNavigate()
  const [jobDescription, setJobDescription] = useState(null);
  const [isLoading , setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState({
    experience: "",
    responsibilities: "",
    skills: "",
    title: "",
    company: "",
    education :"",
    location:"",
    type:""
  });

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')
  const onFinish = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("job_document", jobDescription);
    formData.append('title', parsedData.title);
    formData.append('company', parsedData.company);
    formData.append('location', parsedData.location);
    formData.append('type', parsedData.type);
    formData.append('skills', parsedData.skills);
    formData.append('experience', parsedData.experience);
    formData.append('responsibilities', parsedData.responsibilities);
    formData.append('recruiter', userId);
    try {
        const postJob = await axios.post(`${BASE_URL}/job/`,
        formData,
        {
            headers: {
              Authorization: `Token ${token}`, 
            },
          }
    )
    console.log(postJob)
    navigate('/hire')
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const jdParsing = async (file) => {
   setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("job_pdf", file);
      const jdParserResponse = await axios.post(`${NLP_SERVER}/jobDescriptionParser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
     
      setParsedData({
        experience: jdParserResponse.data.ParsedData.entity['Experience'],
        education :jdParserResponse.data.ParsedData.entity['Education'],
        responsibilities: jdParserResponse.data.ParsedData.entity['Responsibilities'] ,
        skills: jdParserResponse.data.ParsedData.entity['Skills'],
        title: jdParserResponse.data.ParsedData.entity['Job Title'] ,
        company: jdParserResponse.data.ParsedData.entity['company'] ,
      });
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      console.log(e);
    }
  };

  const onFileChange = (file) => {
   
    setJobDescription(file.fileList[0].originFileObj);
    jdParsing(file.fileList[0].originFileObj);
  };

  const onChangeInputText = (e) => {
    const { name, value } = e.target;
    setParsedData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  

  console.log(parsedData.title);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
 
      <Card className="w-full shadow-md rounded-lg">
        <div className="flex justify-center items-center p-6">
          <div className="mr-6">
            <Lottie animationData={animationData} style={{ width: 500, height: 500 }} />
          </div>
          <div className="flex-grow">
            <h1 className="text-xl font-bold mb-4 text-center">Easy Job Posting</h1>
            <form name="easyApplyForm" onSubmit={onFinish} className="w-full">
              <div className="mb-4">
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                  Upload jobDescription
                </label>
                <Upload name="jobDescription" beforeUpload={() => false} onChange={onFileChange}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>

              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={parsedData.title}
                  onChange={onChangeInputText}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
                  placeholder="Enter Job Title"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={parsedData.company}
                  onChange={onChangeInputText}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
                  placeholder="Enter Company Name"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700">
                  Responsibilities
                </label>
                <input
                  type="text"
                  id="responsibilities"
                  name="responsibilities"
                  value={parsedData.responsibilities}
                  onChange={onChangeInputText}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
                  placeholder="Enter Responsibilities"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={parsedData.experience}
                  onChange={onChangeInputText}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
                  placeholder="Enter Experience"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={parsedData.education}
                  onChange={onChangeInputText}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
                  placeholder="Enter Education"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={parsedData.skills}
                  onChange={onChangeInputText}
                  className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2"
                  placeholder="Enter Skills (comma-separated)"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={parsedData.type}
                  onChange={onChangeInputText}
                  className="border-gray-300 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2t"
                >
                  <option value="">Select Job Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={parsedData.location}
                  onChange={onChangeInputText}
                  className="border-gray-300 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border p-2t"
                >
                  <option value="">Select Location</option>
                  <option value="Remote">Remote</option>
                  <option value="On Site">On Site</option>
                </select>
              </div>

              {/* Repeat similar pattern for other fields */}
              
              <Button
              loading = {isLoading}
               type="primary" htmlType="submit" className="w-full">
                Add Job
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobPost;
