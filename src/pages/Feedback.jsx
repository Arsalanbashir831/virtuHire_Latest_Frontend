import React from 'react';
import { useLocation } from 'react-router-dom';
import { Collapse, Typography, Progress, Card } from 'antd';


const Feedback = () => {
    const { Panel } = Collapse;
    const location = useLocation();
    let feedback = location.state?.feedback || [];

    feedback = feedback.map(item => {
        try {
            const parsedItem = JSON.parse(item);
            parsedItem.correctness_percentage = parsedItem.correctness_percentage ?? 0;
            return parsedItem;
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return { correctness_percentage: 0, feedback: 'Invalid data' };
        }
    });

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Typography.Title level={3} className="mb-4 text-center">
                Feedback
            </Typography.Title>
            <Collapse accordion>
                {feedback.map((item, index) => (
                    <Panel header={`Question ${index + 1}`} key={index} className="bg-white">
                        <Card bordered={false}>
                            <Progress
                                percent={item.correctness_percentage}
                                status={item.correctness_percentage > 50 ? "success" : "exception"}
                                showInfo={false}
                                className="mb-2"
                            />
                            <Typography.Paragraph>
                                <strong>Feedback:</strong> {item.feedback}
                            </Typography.Paragraph>
                            <Typography.Text type="secondary">
                                {item.correctness_percentage}% Correct
                            </Typography.Text>
                        </Card>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default Feedback;
