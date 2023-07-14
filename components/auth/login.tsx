import { useEffect} from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import image from "../../design-files/TTLogo.png";
import { NextRouter, useRouter } from "next/router";
import handlelogin from "@/api/loginHandler";
import { Form, notification } from "antd";
import {
  ContentContainer,
  LoginButton,
  LoginForm,
  Navbar,
  Image,
  InputField,
  LoginContainer,
} from "./elements";
export default function Login() {
  const imageSrc:string = image.src;
  const router:NextRouter = useRouter();

  //sending login request to endpoint auth/login
  const handleLoginClick = async (values: unknown) => {
    const { username, password } = values as { username: string; password: string };

    try {
      const login: boolean | undefined = await handlelogin(username, password);
      // Display notfi message and redirect to calls page
      if (login) {
        notification.success({
          message: "Login Successful!",
          duration: 2, // Duration in seconds for pop up
        });
        router.push("/calls");
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the asynchronous operations
    }
  };
  useEffect(() => {
    //on page load localstorage should be clear
    localStorage.clear();
  }, []);

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
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <InputField prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
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
