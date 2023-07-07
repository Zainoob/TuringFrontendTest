import { SetStateAction, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Layout,
  Typography,
  Select,
} from "antd";
import {
  NavBar,
  StyledButton,
  StyledPagination,
  TableComponent,
  ContentContainer,
  Container,
  ImageContainer,
  Image,
  HeadingWrapper,
  Heading,
  TableContainer,
  FilterContainer,
  FormContainer,
  FormItem,
  Filter,
} from "@/styles/calls.styled";
import image from "../design-files/TTLogo.png";
import { Call } from "@/types/Models";
import { useRouter } from "next/router";
import column from "@/components/callcomponents";
import handleCalls from "@/api/callsHandler";
const { Option } = Select;
const columns = column;

const CallsList: React.FC = () => {
  const imageSrc = image.src;
  const [filter, setFilter] = useState("All");
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 6;

  const [calls, setCalls] = useState<Call[]>([]);
  const [filteredcalls, setfilteredCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const callsData: Call[] | undefined = await handleCalls();
        console.log(callsData);
        if (callsData) {
          setLoading(false);
          setCalls(callsData);
          setfilteredCalls(callsData);
        } else {
          console.log("Error in fetching calls");
        }
      } catch (error) {
        console.log("Error in fetching calls", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...Please wait</div>;
  }

  const handleFilterChange = (selectedValue: SetStateAction<string>) => {
    setFilter(selectedValue);

    try {
      // Filter the calls based on the selected filter value
      let filterCalls;

      if (selectedValue === "All") {
        filterCalls = calls;
      } else {
        filterCalls = calls.filter((call) => {
          if (selectedValue === "Archived") {
            return call.is_archived;
          } else if (selectedValue === "Unarchived") {
            return !call.is_archived;
          }
          return false;
        });
      }

      setfilteredCalls(filterCalls);
      console.log("Calls filtered", filterCalls.length);
    } catch (error) {
      console.log("error in filtering calls", error);
    }
  };

  if (filteredcalls.length === 0) {
    return <div>No calls available.</div>;
  }

  const getPaginatedData = () => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredcalls.slice(startIndex, endIndex);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  return (
    <Container>
      <NavBar>
        <ImageContainer>
          <Image src={imageSrc} alt="Turing Tech Logo" />
        </ImageContainer>
        <StyledButton type="primary" onClick={handleLogout}>
          <Typography.Text type="secondary">Log out</Typography.Text>
        </StyledButton>
      </NavBar>
      <ContentContainer>
        <HeadingWrapper>
          <Heading level={5}>Turing Technologies Frontend Test</Heading>
        </HeadingWrapper>
        <TableContainer>
          <FilterContainer>
            <Filter type="secondary">Filter by:</Filter>
            <FormContainer>
              <FormItem>
                <Select
                  value={filter}
                  onChange={(value) => handleFilterChange(value)}
                  style={{ width: "70px", borderBottom: "none" }}
                >
                  <Option value="All">All</Option>
                  <Option value="Archived">Archived</Option>
                  <Option value="Unarchived">Unarchived</Option>
                </Select>
              </FormItem>
            </FormContainer>
          </FilterContainer>
            <div style={{ alignSelf: "center" }}>
            {TableComponent({ dataSource: getPaginatedData(), columns })}
            </div>
            <div style={{ alignSelf: "center" }}>
            <StyledPagination
              total={filteredcalls.length}
              pageSize={rowsPerPage}
              defaultCurrent={1}
              current={page}
              onChange={setPage}
              showSizeChanger={false}
              showQuickJumper={false}
            />
            </div>
        </TableContainer>
      </ContentContainer>
    </Container>
  );
};

export default CallsList;
