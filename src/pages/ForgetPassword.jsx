import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import axios from "axios";

const ForgetPassword = () => {
  const navigation = useNavigate();
  const onFinish = async (values) => {
    try {
      await axios.post(`${BASE_URL}/forgot_password`,{
        email:values.email
      })
      navigation("/otp", {
        state: {
          email: values.email,
          origin: "forget",
        },
      });
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-center text-gray-900">
            Forgot Password
          </h1>
          <p className="text-sm text-center text-gray-600 mt-2">
            Enter your email address below and we'll send you an OTP to verify
            your identity and reset your password.
          </p>
        </div>
        <Form
          name="forget_password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="w-full"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
