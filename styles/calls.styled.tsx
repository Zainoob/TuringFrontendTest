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
  overflow-y: hidden;
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
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const HeadingWrapper = styled.div`
  margin-top: 20px;
  margin-left: 80px;
`;

export const Heading = styled(Typography.Title)`
  margin-bottom: 1rem;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  justify-content: center;
  background-color: #ffffff;
  height: 90vh;
`;

export const FilterContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-left: 160px;
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
  margin-bottom: 1rem;
`;

export const StyledPagination = styled(Pagination)`
  margin-bottom: 1rem;
`;

export const TableComponent = ({
  dataSource,
  columns,
}: {
  dataSource: Call[];
  columns: any[];
}) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      bordered
      style={{ maxWidth: "1200px", width: "100%", marginBottom: "1rem" }}
    />
  );
};

export const CenteredWrapper = styled.div`
  align-items: center;
`;
