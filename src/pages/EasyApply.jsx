import axios from "axios";
import React, { useState } from "react";
import useUserData from "../customhooks/useUserData";
import { BASE_URL, NLP_SERVER } from "../utils";
import Lottie from "lottie-react";
import lottieAnimation from "../assets/applyAnime.json";
import { useLocation , useNavigate } from "react-router-dom";
import { message } from "antd";

const EasyApply = () => {
  
  const userdata = useUserData();
  const navigate =useNavigate()
  const location = useLocation();
  const { job } = location.state;
  const token = localStorage.getItem("token");
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    skills: "",
    experience: "",
    studies: "",
  });
 const [resumeDomain , setResumeDomain ] = useState("")
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
          name:data.ParsedData.entity['Name'],
          description:data.ParsedData.entity['Description'],
          skills: data.ParsedData.entity['Skills'],
          experience: data.ParsedData.entity['Experience'],
          studies: data.ParsedData.entity['Education'],
        });
        setResumeDomain(data.Domain)
        message.success("Successfully Parsed Resume");
      } catch (error) {
        console.error("Error parsing resume:", error);
        message.error("Error in Parsing Resume");
      }
    } else {
      console.error(
        "No files selected or files property not found in event object."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // const formData = new FormData();
      // formData.append("resume_pdf", resume);
      // formData.append("jobdesc_pdf_url", jobDocument);
      // console.log(resume);
      const payload ={
        "candidate_experience":formData.experience,
        "candidate_skills":formData.skills,
        "candidate_edu":formData.studies,
        "candidate_desc":formData.description,
        "candidate_domain":resumeDomain,
        "job_title":job.title,
        "job_skills":job.skills,
        "job_education":job.education,
        "job_responsibilities":job.responsibilities,
        "job_experience":job.experience
       }
      //  console.log(payload);
      const response = await axios.post(
        `${NLP_SERVER}/matchingscore_latest`,
      payload
      );
     console.log(response)
      if (response) {
        const currentDate = new Date();
        // Extract year, month, and day
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        // Format the date
        const formattedDate = `${year}-${month}-${day}`;
        const AppliedformData = new FormData();
        AppliedformData.append("applied_date", formattedDate);
        AppliedformData.append("resume", resume);
        AppliedformData.append("avg_score", response.data.avg_score);
        AppliedformData.append( "experience_score", response.data.experience_score);
        AppliedformData.append( "description_score", response.data.description_score);
        AppliedformData.append( "education_score", response.data.education_score);
        AppliedformData.append( "skills_score", response.data.skills_score);
        AppliedformData.append( "domain_score", response.data.domain_score);
        AppliedformData.append("candidate", userdata.id);
        AppliedformData.append("job", job.id);
      
        try {
          const submission = await axios.post(
            `${BASE_URL}/appliedjobs/`,
            AppliedformData,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          // If the request was successful
          message.success("Resume is Submitted");
          setIsLoading(false);
          navigate('/')
        } catch (error) {
          // If an error occurs
          setIsLoading(false);
          if (error.response && error.response.status === 400) {
            message.error("Candidate has already applied for this job");
          } else {
            // Handle other errors
            message.error("An error occurred during submission. Please try again.");
            setIsLoading(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
 console.log(job)
  return (
    <div className="flex justify-center mt-11">
      <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Lottie animation */}
        <div className="relative w-full md:w-1/2">
          <Lottie
            animationData={lottieAnimation}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </div>

        {/* Form section */}
        <div className="w-full md:w-1/2 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Easy Apply</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700"
              >
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

            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700"
                >
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
                {isLoading ? "Applying..." : "Apply"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EasyApply;
