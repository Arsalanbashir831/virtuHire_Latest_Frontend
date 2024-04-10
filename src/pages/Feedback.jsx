import React from 'react';
import { useLocation } from 'react-router-dom';
import { Collapse, Typography } from 'antd';


const Feedback = () => {
    const { Panel } = Collapse;
    const location = useLocation();
 const feedback = location.state?.feedback || []; // Retrieve feedback data from location state
 
  return (
    <div className="p-4">
      <Typography.Title level={3} className="mb-4">
        Feedback
      </Typography.Title>
      <Collapse accordion>
        {feedback.map((item, index) => (
          <Panel header={`Question ${index + 1}`} key={index}>
            <Typography.Text>{item}</Typography.Text>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Feedback;
