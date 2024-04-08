import React, { useEffect } from "react";
import { Card, Button, Avatar, Divider, Tag } from "antd";
import {
  ClockCircleOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRecoilValue ,useSetRecoilState} from "recoil";
import { selectedJobState } from "../atoms/JobState";
import { useNavigate } from "react-router-dom";
function stringToList(inputString) {
  // Check if the inputString is not empty
  if (!inputString || typeof inputString !== 'string') {
    return []; // Return empty array if input is invalid
  }

  const list = inputString
    .split(',') 
    .map(item => item.trim()) 
    .filter(item => item !== ''); 

  return list;
}

export const JobDetail = ({ isRecruiter }) => {
  const navigate = useNavigate();
  const selectedJob = useRecoilValue(selectedJobState);
  const setSelectedJob = useSetRecoilState(selectedJobState);
useEffect(()=>{
  setSelectedJob(null)
},[])



  if (!selectedJob) return <div></div>;
  return (
    <Card className="mx-5 mt-5 border rounded-lg overflow-hidden shadow-lg">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="bg-red-500"
            />
            <div>
              <h3 className="text-2xl font-bold">{selectedJob.company}</h3>
              <h3 className="text-2xl font-bold">{selectedJob.title}</h3>

              <p className="text-gray-500">
                {selectedJob.location} - {selectedJob.type}
              </p>
            </div>
          </div>
          {isRecruiter === false ? (
            <>
              <Button
                onClick={() => {
                  navigate("/EasyApply", { state: { id: selectedJob.id ,jobUrl:selectedJob.url , jobDocument:selectedJob.job_document } });
                }}
                type="primary"
                style={{
                  backgroundColor: "green",
                  borderColor: "green",
                  color: "white",
                }}
              >
                Easy Apply
              </Button>
            </>
          ) : (
            <>
              <div className="flex gap-1">
                <>
                  <Button
                    type="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    danger
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() =>
                      navigate("/candidateRecommendation", {
                        state: { id: selectedJob.id },
                      })
                    }
                  >
                    Best Candidate
                  </Button>
                </>
              </div>
            </>
          )}
        </div>
        <Divider />
        <div>
          <h4 className="font-bold">Responsibilities:</h4>
          <p>{selectedJob.responsibilities}</p>
        </div>
        <Divider />
        <div>
          <h4 className="font-bold">Experience Required:</h4>
          <p>{selectedJob.experience}</p>
        </div>
        <Divider />
        <div>
          <h4 className="font-bold">Skills:</h4>
          <div className="flex flex-wrap gap-2">
            { stringToList(selectedJob.skills).map((skill, index) => (
              <Tag color="blue" key={index}>
                {skill}
              </Tag>
            ))}
          </div>
        </div>
        <Divider />
        <div className="flex justify-between items-center mt-4">
          <div>
            <ClockCircleOutlined className="align-middle mr-2" />
            <span className="text-gray-500 align-middle">
              {selectedJob.postedDate}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
