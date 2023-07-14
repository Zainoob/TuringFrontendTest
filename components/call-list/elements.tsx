import {
  Layout,
  Typography,
  Select,
  Form,
  Table,
  Button,
  Pagination,
} from "antd";
import styled from "styled-components";
import theme from "@/styles/theme.module.scss";
const { backgroundColor, arhiveBg, archiveText, unarchiveBg, unarchiveText } = theme;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  text-align: left;
  justify-content: center;
  background-color: ${backgroundColor};
`;

export const FilterContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-left: 200px;
`;

export const Filter = styled(Typography.Text)`
  margin-right: 0.5rem;
`;

export const FormContainer = styled(Form)`
  border-bottom: none;
`;

export const FormItem = styled(Form.Item)`
  margin-bottom: 0;
`;

export const Dropdown = styled(Select)`
  width: 70px;
  border-bottom: none;
`;

export const StyledTable = styled(Table)`
  max-width: 1200px;
  width: 100%;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: center;
  display: flex;

  .ant-pagination {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;

export const StyledSelect = styled(Select)`
  width: 70px;
  border-bottom: none;
`;

export const ArchiveButton = styled(Button)`
  border-radius: 4px;
  width: 100px;
  background-color: ${arhiveBg};
  color: ${archiveText};
  box-shadow: none;
`;
export const UnarchiveButton = styled(Button)`
  border-radius: 4px;
  background-color: ${unarchiveBg};
  color: ${unarchiveText};
  width: 100px;
  box-shadow: none;
`;

export const CenteredWrapper = styled.div`
  align-items: center;
  justify-content: center;
`;
