import React, { useEffect, useState } from "react";
import { Card, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { selectedJobState } from "../atoms/JobState";
import axios from "axios";
import { BASE_URL } from "../utils";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Lumina Datamatics",
    type: "Part Time",
    location: "Remote",
    postedDate: "3 days ago",
    responsibilities:"Translate designs into high-quality code, optimize components for maximum performance, lead and mentor junior developers...",
    experience:"At least 5 years experience in frontend development, proficiency in React, understanding of Redux and TypeScript...",
    skills: ["JavaScript", "React", "Redux", "TypeScript", "HTML/CSS", "Git"],
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Tech Innovators Inc.",
    type: "Full Time",
    location: "City Center, New York",
    postedDate: "1 week ago",
    responsibilities:"Design and develop server-side applications, implement APIs, optimize database queries, collaborate with frontend and DevOps teams...",
    experience:"Minimum 3 years experience in backend development, proficiency in Node.js, knowledge of relational and NoSQL databases...",
    skills: ["Node.js", "Express.js", "MongoDB", "SQL", "RESTful APIs", "Git"],
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Data Insights Co.",
    type: "Contract",
    location: "San Francisco, CA",
    postedDate: "2 weeks ago",
    responsibilities:"Utilize machine learning techniques to analyze large datasets, develop predictive models, collaborate with stakeholders to derive insights...",
    experience:"Ph.D. or Master's degree in Computer Science, Statistics, or related field, proficiency in Python, experience with data visualization tools...",
    skills: [
      "Python",
      "Machine Learning",
      "Statistics",
      "Data Analysis",
      "Data Visualization",
      "TensorFlow",
    ],
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Designs Agency",
    type: "Freelance",
    location: "Remote",
    postedDate: "4 days ago",
    responsibilities:"Create user-centered designs, prototype and iterate designs based on user feedback, collaborate with developers to implement design solutions...",
    experience:"3+ years of experience in UI/UX design, proficiency in design tools such as Sketch, Figma, or Adobe XD...",
    skills: [
      "UI Design",
      "UX Design",
      "Prototyping",
      "User Research",
      "Design Tools",
    ],
  },
  {
    id: 5,
    title: "Software Engineer",
    company: "Tech Solutions Ltd.",
    type: "Full Time",
    location: "Boston, MA",
    postedDate: "5 days ago",
    responsibilities:"Develop and maintain scalable software applications, write clean and efficient code, participate in code reviews and team discussions...",
    experience:"Bachelor's degree in Computer Science or related field, proficiency in Java, experience with Spring Framework...",
    skills: [
      "Java",
      "Spring Framework",
      "RESTful APIs",
      "Database Management",
      "Software Development",
    ],
  },
];

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

const JobList = () => {
  const [jobResponse, setJobResponse] = useState(null);
  const [selectedJob, setSelectedJob] = useRecoilState(selectedJobState);
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchJobs = async () => {
      const config = {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      };
      try {
        const response = await axios.get(`${BASE_URL}/job`, config);
        console.log(response.data);
        setJobResponse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, []);

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
