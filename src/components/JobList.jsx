import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedJobState } from "../atoms/JobState";
import axios from "axios";
import { BASE_URL } from "../utils";
import { searchState } from "../atoms/SearchState";
import { LocationFilterState } from "../atoms/LocationFilterState";
import { jobTypeState } from "../atoms/JobTypeLocationState";




const JobCard = ({ job, selectJob }) => {
  return (
    <Card onClick={() => selectJob(job)} className="mb-4 cursor-pointer">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <ClockCircleOutlined className="text-gray-500" />{" "}
          <span className="ml-1 text-gray-500">{job.postedDate}</span>
          <h3 className="text-lg font-bold">{job.title}</h3>
          <p className="text-gray-600">
            {job.company} -{" "}
            <span className="text-gray-500">{job.location}</span>
          </p>
          <div className="flex mt-2">
            <Tag color="blue">{job.type}</Tag>
          </div>
          <p className="text-gray-600 mt-2">
            {job.responsibilities?.length > 100
              ? job.responsibilities?.slice(0, 100) + "..."
              : job?.responsibilities}
          </p>
        </div>
      </div>
    </Card>
  );
};

const JobList = ({isRecruiter}) => {
  const [jobResponse, setJobResponse] = useState(null);
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobState);
  const authToken = localStorage.getItem("token");
const querySearch = useRecoilValue(searchState)
const queryLocation = useRecoilValue(LocationFilterState)
const queryJobTypeState = useRecoilValue(jobTypeState)
let jobResUrl=`${BASE_URL}/job?search=${querySearch}&location=${queryLocation}&type=${queryJobTypeState}`

useEffect(() => {
    const fetchJobs = async () => {
      const config = {
        headers: {
          Authorization: `Token ${authToken}`
        },
        
      };
      try {
        if (isRecruiter===true) {
           const response = await axios.get(`${BASE_URL}/job/posted_by_recruiter`, config)
          setJobResponse(response.data);
        }else{
         
          const response = await axios.get(jobResUrl, config);
          setJobResponse(response.data);
        }
    
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [jobResUrl]);
  //jobResponse,queryLocation,queryJobTypeState

  const handleCardClick = (job) => {
    setSelectedJob(job);
  };



  return (
    <div className="container mx-auto px-4 my-5 overflow-scroll overflow-x-hidden h-[500px]">
      {jobResponse?.map((job) => (
        <JobCard key={job.id} job={job} selectJob={handleCardClick} />
      ))}
    </div>
  );
};

export default JobList;
