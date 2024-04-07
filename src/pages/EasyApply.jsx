import axios from "axios";
import React, { useState } from "react";
import useUserData from "../customhooks/useUserData";
import { BASE_URL,NLP_SERVER } from "../utils";
import Lottie from 'lottie-react' 
import lottieAnimation from '../assets/applyAnime.json'
import {useLocation} from "react-router-dom"
const EasyApply = () => {
  const userdata = useUserData();
  const location = useLocation()
  const {id,jobUrl,jobDocument} = location.state
  const token = localStorage.getItem('token')
  const [resume, setResume] = useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    skills: "",
    experience: "",
    studies: "",
  });

  const handleFileChange = async (e) => {
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResume(file);
     
      const formData = new FormData();
      formData.append("resume_pdf", file);
  
      try {
        const response = await fetch(`${NLP_SERVER}/resumeParser`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setFormData({
          name: data.entities.hasOwnProperty('NAME')&& data.entities.NAME[0]!=="" ?data.entities.NAME[0]:"" ,
          location: data.entities.hasOwnProperty('LOCATION') && data.entities.LOCATION[0] !== "" ? data.entities.LOCATION[0] : "",
          skills: data.entities.hasOwnProperty('SKILLS') ?data.entities.SKILLS.join(", "):"",
          experience: data.entities.hasOwnProperty('WORKED AS')?data.entities["WORKED AS"].join(", ") : "",
          studies: data.entities.hasOwnProperty('WORKED AS')?data.entities.DEGREE?.join(", ") : "",
        });

      } catch (error) {
        console.error("Error parsing resume:", error);
      }
    } else {
      console.error("No files selected or files property not found in event object.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("resume_pdf", resume);
      formData.append("jobdesc_pdf_url", jobDocument);
      console.log(resume);
      const response = await axios.post(
        `${NLP_SERVER}/matchingscore_latest`,
        formData
      );
      console.log(response.data);
      if (response) {
        const currentDate = new Date();
        // Extract year, month, and day
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        // Format the date
        const formattedDate = `${year}-${month}-${day}`;
      const AppliedformData= new FormData()
      AppliedformData.append('applied_date',formattedDate)
      AppliedformData.append('resume',resume)
      AppliedformData.append('score',response.data.score)
      AppliedformData.append('candidate',`${BASE_URL}/user/${userdata.id}/`)
      AppliedformData.append('job',jobUrl)
        const submission = await axios.post(
          `${BASE_URL}/appliedjobs/`,
          AppliedformData,
          {
            headers: {
              Authorization: `Token ${token}`, 
            },
          }
        );
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="flex justify-center mt-11">
    <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Lottie animation */}
      <div className="relative w-full md:w-1/2">
        <Lottie animationData={lottieAnimation}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      </div>

      {/* Form section */}
      <div className="w-full md:w-1/2 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Easy Apply</h2>
         
           
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
              Upload Resume:
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Dynamic form fields based on formData */}
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}

          <div className="text-right">
            <button
              type="submit"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              {isLoading ? 'Applying...' : 'Apply'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default EasyApply;