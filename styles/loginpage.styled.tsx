import styled from "styled-components";
import { Layout, Input, Button, Card, Space, Form } from "antd";
const { Header, Footer } = Layout;

export const Image = styled.img`
  width: 180px;
  height: 20px;
  background-color: #ffffff;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fdf5f3;
`;

export const LoginForm =styled(Form)`
  width: 500px;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
`;

export const InputField = styled(Input)`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%
`;

export const FormContainer= styled(Form)`
  width: 100%
`;
export const LoginContainer = styled.div`
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
  width: 100%;
`;

export const LoginButton = styled(Button)`
  width: 80px;
  height: 40px;
  border-radius: 5px;
`;
export const Navbar = styled(Header)`
    background-color: #ffffff;
`;
