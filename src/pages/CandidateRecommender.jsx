import React from 'react';
import { Table, Button, Typography } from 'antd';


const { Title } = Typography;

const candidates = [
  {
    key: '1',
    name: 'John Doe',
    score: 95,
    domain: 'Software Development',
  },
  {
    key: '2',
    name: 'Jane Smith',
    score: 88,
    domain: 'Data Science',
  },
  {
    key: '3',
    name: 'Jim Brown',
    score: 78,
    domain: 'Cybersecurity',
  },
  // ... other candidates
];

const CandidateRecommender = () => {
  const columns = [
    {
      title: 'Candidate Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: 'Predicted Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div className="space-x-2">
          <Button type="link" onClick={() => console.log('View resume', record)}>View Resume</Button>
          <Button type="primary" onClick={() => console.log('Hire', record)}>Hire</Button>
          <Button danger onClick={() => console.log('Rejected', record)}>Rejected</Button>
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
        dataSource={candidates}
        columns={columns}
        pagination={false}
        className="w-full max-w-3xl"
      />
    </div>
  );
};

export default CandidateRecommender;
