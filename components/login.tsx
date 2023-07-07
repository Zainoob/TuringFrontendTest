import { useEffect, useState, useContext } from 'react';
import { FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { authtoken } from "@/types/Models";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import image from "../design-files/TTLogo.png";
import { useRouter } from "next/router";
import handlelogin from '@/api/loginHandler';
import { ContentContainer, LoginButton, LoginCard, Navbar, Image, InputField, ButtonContainer } from '@/styles/loginpage.styled';
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const imageSrc = image.src;
  const router = useRouter();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  //sending login request to endpoint auth/login
  const handleLoginClick = async (event: FormEvent) => {
    event.preventDefault();
    console.log("we enter the login function ");
    try {
        const login: boolean | undefined = await handlelogin(username, password);
      // Display alert message
       //redirecting to calls page
       router.push("/calls");
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div>
      <Navbar>
          <Image src={imageSrc} alt="Company Logo"/>
      </Navbar>
      <ContentContainer>
        <form onSubmit={handleLoginClick}>
          <LoginCard>
          <InputField
              name="username"
              placeholder="Username"
              onChange={handleUsername}
              prefix={<UserOutlined />}
              required
            />
            <InputField
              name="password"
              placeholder="Password"
              type="password"
              prefix={<LockOutlined />}
              onChange={handlePassword}
              required
            />
            <ButtonContainer>
              <LoginButton type="primary" htmlType="submit">
                Login
              </LoginButton>
            </ButtonContainer>
          </LoginCard>
        </form>
      </ContentContainer>
    </div>
  );
}