import {
    Layout,
    Typography,
    Select,
    Form,
    Table,
    Pagination,
  } from "antd";
  import styled from "styled-components";
  import { Call} from "@/types/Models";
 
  export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height:fit-content;
    text-align: left;
    justify-content: center;
    background-color: #ffffff;
  `;
  
  export const FilterContainer = styled.div`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    margin-left: 180px;
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
  
  export const CenteredWrapper = styled.div`
    align-items: center;
  `;
  