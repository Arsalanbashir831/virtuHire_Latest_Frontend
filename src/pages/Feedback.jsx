import React from 'react';
import { useLocation } from 'react-router-dom';
import { Collapse, Typography, Progress, Card, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const { Panel } = Collapse;

const Feedback = () => {
    const location = useLocation();
    const feedback = location.state?.feedback || [];

    // Calculate the average score
    const totalScore = feedback.reduce((sum, item) => sum + item.score, 0);
    const avgScore = feedback.length ? (totalScore / feedback.length).toFixed(2) : 0;

    // Prepare data for the line graph
    const graphData = feedback.map((item, index) => ({
        name: `Q${index + 1}`,
        score: item.score
    }));

    // Prepare data for the pie chart
    const successCount = feedback.filter(item => item.score > 50).length;
    const failCount = feedback.length - successCount;
    const pieData = [
        { name: 'Success', value: successCount },
        { name: 'Failure', value: failCount }
    ];
    const COLORS = ['#00C49F', '#FF8042'];

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Typography.Title level={3} className="mb-4 text-center">
                Feedback
            </Typography.Title>
            <Typography.Title level={4} className="mb-4 text-center">
                Average Score: {avgScore}%
            </Typography.Title>
            <Row gutter={[16, 16]} className="mb-4">
                <Col span={12}>
                    <Card bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="score" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
            <Collapse accordion>
                {feedback.map((item, index) => (
                    <Panel header={`Question ${index + 1}`} key={index} className="bg-white">
                        <Card bordered={false}>
                            <Progress
                                percent={item.score}
                                status={item.score > 50 ? "success" : "exception"}
                                showInfo={false}
                                className="mb-2"
                            />
                            <Typography.Paragraph>
                                <strong>Feedback:</strong> {item.feedback}
                            </Typography.Paragraph>
                            <Typography.Text type="secondary">
                                {item.score}% Correct
                            </Typography.Text>
                        </Card>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default Feedback;
