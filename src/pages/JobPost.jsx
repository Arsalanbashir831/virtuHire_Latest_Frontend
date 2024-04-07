import React, { useState,useEffect } from 'react';
import { Form, Input, Button, Upload, Card, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import animationData from '../assets/applyAnime.json'; // Your Lottie animation JSON file
import { NLP_SERVER } from '../utils';
import axios from 'axios'
const { Option } = Select;

const JobPost = () => {
    const { TextArea } = Input;
  const [jobDescription, setjobDescription] = useState(null);
  const [parsedData , setParsedData] = useState({
    experience: "",
    responsibilities: "",
    skills: "",
    title: "",
    company: "",
  })

  const onFinish = async (values) => {
    try {
      const { Skills, ...restValues } = values;
      const skillsArray = Skills.split(',').map((skill) => skill.trim());

      console.log('Submitted values:', { ...restValues, Skills: skillsArray });
      console.log('Uploaded jobDescription:', jobDescription);

      // Handle further processing or API calls here
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const jdParsing = async (file)=>{
    try{
        const formData = new FormData()
        formData.append("job_pdf",file);
        const jdParserResponse = await axios.post(`${NLP_SERVER}/jobDescriptionParser`,formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          console.log(jdParserResponse)
          setParsedData({
            experience: jdParserResponse.data.entities.hasOwnProperty('EXPERIENCE')?jdParserResponse.data.entities.EXPERIENCE[0]:"",
            roles: jdParserResponse.data.entities.hasOwnProperty('ROLES')?jdParserResponse.data.entities.ROLES[0]:"",
            skills: jdParserResponse.data.entities.hasOwnProperty('SKILLS') ?jdParserResponse.data.entities.SKILLS.join(", "):"",
            title: jdParserResponse.data.entities.hasOwnProperty('TITLE')? jdParserResponse.data.entities.TITLE[0]:"",
            company: jdParserResponse.data.entities.hasOwnProperty('TITLE')? jdParserResponse.data.entities.TITLE[1]:"",
          });

    }catch(e){
        console.log(e)
    }
   
  }
  const onFileChange =   (file) => {
    setjobDescription(file.fileList[0].originFileObj);
     jdParsing(file.fileList[0].originFileObj)
  };
  const onChangeInputText = (e) => {
    const { name, value } = e.target;
    setParsedData({ ...parsedData, [name]: value });
  };
  
 
console.log(parsedData);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full shadow-md rounded-lg">
        <div className="flex justify-center items-center p-6">
          <div className="mr-6">
            <Lottie animationData={animationData} style={{ width: 500, height: 500 }} />
          </div>
          <div className="flex-grow">
            <h1 className="text-xl font-bold mb-4 text-center">Easy Job Posting</h1>
            <Form name="easyApplyForm" onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Upload jobDescription"
                name="jobDescription"
                valuePropName="fileList"
                getValueFromEvent={onFileChange}
                rules={[{ required: true, message: 'Please upload your jobDescription' }]}
              >
                <Upload name="jobDescription" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Job Title"
                name="title"
                rules={[{ required: true, message: 'Please enter Job Title' }]}
              >
               
                <Input placeholder="Enter Job Title" rows={4} name='title'  value={parsedData.title} onChange={onChangeInputText} />
              </Form.Item>
              <Form.Item
                label="Company Name"
                name="company"
                rules={[{ required: true, message: 'Please enter Company Name' }]}
              >
                <Input placeholder="Enter Company Name" name='company' value={parsedData.company} onChange={onChangeInputText} />
              </Form.Item>
              <Form.Item
                label="Responsibilities"
                name="responsibilities"
                rules={[{ required: true, message: 'Please enter Responsibilities' }]}
              >
                <Input placeholder="Enter Responsibilities" name="responsibilities" value={parsedData.responsibilities} onChange={onChangeInputText} />
              </Form.Item>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true, message: 'Please enter Experience' }]}
              >
                <Input placeholder="Enter Experience" name='experience' value={parsedData.experience} onChange={onChangeInputText}/>
              </Form.Item>
              <Form.Item
                label="Skills"
                name="skills"
                rules={[{ required: true, message: 'Please enter Skills' }]}
              >
                <Select
                  mode="tags"
                  placeholder="Enter Skills"
                  style={{ width: '100%' }}
                  value={parsedData.skills}
                  onChange={onChangeInputText}
                />
              </Form.Item>

              <Form.Item
                label="Job Type"
                name="jobType"
                rules={[{ required: true, message: 'Please select job type' }]}
              >
                <Select placeholder="Select job type">
                  <Option value="Full Time">Full Time</Option>
                  <Option value="Part Time">Part Time</Option>
                  <Option value="Freelance">Freelance</Option>
                  <Option value="Contract">Contract</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: 'Please select location' }]}
              >
                <Select placeholder="Select location">
                  <Option value="remote">Remote</Option>
                  <Option value="on-site">On Site</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Add Job
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobPost;
