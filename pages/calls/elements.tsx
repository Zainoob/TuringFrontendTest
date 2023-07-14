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
import theme from "@/styles/theme.module.scss";
const { backgroundColor, buttonColor } = theme;

const { Header, Content } = Layout;

export const StyledButton = styled(Button)`
  color: ${backgroundColor};
  background-color: ${buttonColor};
  margin-left: auto;
`;

export const Container = styled(Layout)`
  overflow-x: hidden;
  height: fit-content;
`;
export const NavBar = styled(Header)`
  background-color: ${backgroundColor};
  display: flex;
  align-items: center;
`;

export const ImageContainer = styled.div`
  flex: 1;
`;

export const Image = styled.img`
  width: 220px;
  height: 25px;
  background-color: ${backgroundColor};
`;

export const ContentContainer = styled(Content)`
  background-color: ${backgroundColor};
  height: fit-content;
  overflow-x: hidden;
`;

export const HeadingWrapper = styled.div`
  margin-top: 20px;
  margin-left: 100px;
`;

export const Heading = styled(Typography.Title)`
  margin-bottom: 3rem;
`;

export const CenteredWrapper = styled.div`
  align-items: center;
`;
