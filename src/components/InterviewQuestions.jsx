import React, { useState } from 'react';
import axios from 'axios';
import { QA_SERVER } from '../utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedTextArea } from '../atoms/AnswerState';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Card, Typography } from 'antd';


const { TextArea } = Input;
const { Title } = Typography;

const InterviewQuestions = () => {
  const [domain, setDomain] = useState('');
  const [questions, setQuestions] = useState([]);
  const answer = useRecoilValue(selectedTextArea);
  const setAnswer = useSetRecoilState(selectedTextArea);
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const fetchQuestions = async () => {
    if (domain.trim() === '') {
      alert('Please enter a domain before fetching questions.');
      return;
    }

    try {
      const response = await axios.get(`${QA_SERVER}/question_generation/${domain}`);
      setQuestions(response.data.questions);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  const handleFetchQuestions = () => {
    fetchQuestions();
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleRestartInterview = () => {
    setCurrentQuestionIndex(0);
  };

  const submitAnswer = async () => {
    try {
      const evaluation = await axios.post(`${QA_SERVER}/answer_comparison`, {
        question: questions[currentQuestionIndex],
        user_answer: answer,
      });
      setFeedback((prevFeedback) => [...prevFeedback, evaluation.data.response]);
      handleNextQuestion();
      setAnswer('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <Input
        className="mb-4"
        placeholder="Enter domain"
        value={domain}
        onChange={handleDomainChange}
      />
      <Button type="primary" onClick={handleFetchQuestions} className="mb-4">
        Fetch Questions
      </Button>

      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <Card className="mb-4">
          <Title level={4}>Question {currentQuestionIndex + 1}</Title>
          <p className="mb-4">{questions[currentQuestionIndex]}</p>
          <Button type="primary" onClick={submitAnswer} className="mr-2">
            Submit
          </Button>
        </Card>
      )}

      {currentQuestionIndex === questions.length -1 && (
        <Button type="primary" onClick={() => navigate('/feedback', { state: { feedback } })}>
          View Feedback
        </Button>
      )}
    </div>
  );
};

export default InterviewQuestions;
