import React from 'react';
import { Card, Button, Rate, Avatar, Divider, Tag } from 'antd';
import { ClockCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

export const JobDetail = ({ job }) => {
    return (
      <Card className="mx-5 mt-5 border rounded-lg overflow-hidden shadow-lg">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <Avatar size="large" icon={<UserOutlined />} className="bg-red-500" />
              <div>
                <h3 className="text-2xl font-bold">{job.company}</h3>
                <h3 className="text-2xl font-bold">{job.title}</h3>
                <Rate disabled defaultValue={job.rating} />
                <p className="text-gray-500">{job.location} - {job.type}</p>
              </div>
            </div>
            <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}>Easy Apply</Button>
          </div>
          <Divider />
          <div>
            <h4 className="font-bold">Responsibilities:</h4>
            <p>{job.responsibilities}</p>
          </div>
          <Divider />
          <div>
            <h4 className="font-bold">Experience Required:</h4>
            <p>{job.experience}</p>
          </div>
          <Divider />
          <div>
            <h4 className="font-bold">Skills:</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Tag color="blue" key={index}>{skill}</Tag>
              ))}
            </div>
          </div>
          <Divider />
          <div className="flex justify-between items-center mt-4">
            <div>
              <ClockCircleOutlined className="align-middle mr-2" />
              <span className="text-gray-500 align-middle">{job.postedDate}</span>
            </div>
           
          </div>
        </div>
      </Card>
    );
};
