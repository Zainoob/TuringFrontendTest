import styled from "styled-components";
import { Layout, Input, Button, Card, Space } from "antd";
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

export const LoginCard = styled(Card)`
  display: flex;
  width: 500px;
  padding: 4px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
`;

export const InputField = styled(Input)`
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
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
