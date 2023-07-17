import {
  Button,
} from "antd";
import styled from "styled-components";
import { globalTheme } from "@/styles/theme";

export const StyledButton = styled(Button)`
  background-color: ${globalTheme.colors.buttonColor};
  margin-left: auto;
  color: ${globalTheme.colors.backgroundColor};
`;

export const DetailsContainer = styled.div`
   display:flex;
`;
export const Text = styled.p`
`;
