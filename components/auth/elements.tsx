import styled from "styled-components";
import { Layout, Input, Button, Card, Space, Form } from "antd";
const { Header, Footer } = Layout;
import theme from '@/styles/theme.module.scss';
const { backgroundColor, loginformBg,  borderRadius } = theme;


export const Image = styled.img`
  width: 180px;
  height: 20px;
  background-color: ${backgroundColor};
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${loginformBg};
`;

export const LoginForm =styled(Form)`
  width: 500px;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundColor};
  border-radius:  ${borderRadius};
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
  border-radius: ${borderRadius};
`;
export const Navbar = styled(Header)`
    background-color:${backgroundColor};
`;
