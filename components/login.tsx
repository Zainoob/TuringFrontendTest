import { useEffect, useState, useContext } from "react";
import { FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { authtoken } from "@/types/Models";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import image from "../design-files/TTLogo.png";
import { useRouter } from "next/router";
import handlelogin from "@/api/loginHandler";
import { Form, Input, Button } from "antd";
import {
  ContentContainer,
  LoginButton,
  LoginForm,
  Navbar,
  Image,
  InputField,
  ButtonContainer,
  LoginContainer,
} from "@/styles/loginPage.styled";
export default function Login() {
  const imageSrc = image.src;
  const router = useRouter();

  //sending login request to endpoint auth/login
  const handleLoginClick = async (values: unknown) => {
    const { username, password } = values as { username: any; password: any };
    console.log(username, password);
    console.log("we enter the login function");
    try {
      const login: boolean | undefined = await handlelogin(username, password);
      // Display alert message
      // Redirecting to calls page
      router.push("/calls");
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the asynchronous operations
    }
  };

  return (
    <LoginContainer>
      <Navbar>
        <Image src={imageSrc} alt="Company Logo" />
      </Navbar>
      <ContentContainer>
        <LoginForm layout="vertical" onFinish={handleLoginClick}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <InputField prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <InputField
                prefix={<LockOutlined />}
                placeholder="Password"
                type="password"
              />
            </Form.Item>
            <Form.Item>
              <LoginButton type="primary" htmlType="submit">
                Login
              </LoginButton>
            </Form.Item>
        </LoginForm>
      </ContentContainer>
    </LoginContainer>
  );
}
