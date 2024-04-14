import React, { useEffect, useState } from "react";
import { Table, Button, Typography } from "antd";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useLocation , useNavigate } from "react-router-dom";


const { Title } = Typography;



const CandidateRecommender = () => {
    const location = useLocation();
    const {jobId} = location.state; 
    const token = localStorage.getItem('token');
    const [candidateResponse, setCandidateResponse] = useState(null);
    
   
    useEffect(() => {
        
        const fetchCandidate = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/appliedjobs/${jobId}/get_candidate/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          console.log(response.data);
          setCandidateResponse(response.data);
        } catch (error) {
          console.log('Error fetching candidate:', error);
        }
      };
  
      fetchCandidate();

  
    }, [token]); 

  
  
    const columns = [
        {
            title: "Candidate",
            dataIndex: "candidate_details",
            key: "candidate",
            render: (candidate_details) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={candidate_details.profile} alt="Candidate" style={{ width: 50, height: 50, borderRadius: '50%', marginRight: 10 }} />
                <span>{`${candidate_details.first_name} ${candidate_details.last_name}`}</span>
              </div>
            ),
          },
    {
      title: "Description Score",
      dataIndex: "description_score",
      key: "description_score",
      sorter: (a, b) => b.description_score - a.description_score,
    },
    {
      title: "Experience Score",
      dataIndex: "experience_score",
      key: "experience_score",
      sorter: (a, b) => b.experience_score - a.experience_score,
    },
    {
      title: "Skills Score",
      dataIndex: "skills_score",
      key: "skills_score",
      sorter: (a, b) => b.skills_score - a.skills_score,
    },
    {
      title: "Domain Score",
      dataIndex: "domain_score",
      key: "domain_score",
      sorter: (a, b) => b.domain_score - a.domain_score,
    },
    {
      title: "Average Score",
      dataIndex: "avg_score",
      key: "avg_score",
      sorter: (a, b) => b.avg_score - a.avg_score,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            type="link"
            onClick={() => window.open(record.resume, "_blank")} >
            View Resume
          </Button>
          <Button type="primary" onClick={() => console.log("Hire", record)}>
            Hire
          </Button>
          <Button danger onClick={() => console.log("Rejected", record)}>
            Rejected
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="mb-8">
        <Title level={2}>Candidate Recommendation</Title>
      </div>
      <Table
        dataSource={candidateResponse}
        columns={columns}
        pagination={true}
        className="w-full "
      />
    </div>
  );
};

export default CandidateRecommender;
