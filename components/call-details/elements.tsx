import {
  Button,
} from "antd";
import styled from "styled-components";
import theme from '@/styles/theme.module.scss';

const { backgroundColor, loginformBg,  borderRadius, buttonColor } = theme;

export const StyledButton = styled(Button)`
  background-color: ${buttonColor};
  margin-left: auto;
  color: ${backgroundColor};
`;

export const DetailsContainer = styled.div`
   display:flex;
`;
export const Text = styled.p`
`;
