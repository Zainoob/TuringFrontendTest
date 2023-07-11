import {
  Layout,
  Typography,
  Button,
  Select,
  Form,
  Table,
  Pagination,
} from "antd";
import styled from "styled-components";
import { CallResponse, Call, Note } from "@/types/Models";

const { Header, Content } = Layout;

export const StyledButton = styled(Button)`
  background-color: #4c41f5;
  margin-left: auto;
  color: #ffffff;
`;

export const Container = styled(Layout)`
  overflow-x: hidden;
  height: fit-content;
`;
export const NavBar = styled(Header)`
  background-color: #ffffff;
  display: flex;
  align-items: center;
`;

export const ImageContainer = styled.div`
  flex: 1;
`;

export const Image = styled.img`
  width: 220px;
  height: 25px;
  background-color: #ffffff;
`;

export const ContentContainer = styled(Content)`
  background-color: #ffffff;
  height: fit-content;
  overflow-x: hidden;
`;

export const HeadingWrapper = styled.div`
  margin-top: 20px;
  margin-left: 90px;
`;

export const Heading = styled(Typography.Title)`
  margin-bottom: 3rem;
`;

export const CenteredWrapper = styled.div`
  align-items: center;
`;
