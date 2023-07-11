import React, { useState, useEffect, SetStateAction } from "react";
import { Select, notification, Button } from "antd";
import {
  StyledPagination,
  TableContainer,
  FilterContainer,
  StyledTable,
  FormContainer,
  FormItem,
  CenteredWrapper,
  Filter,
  ArchiveButton,
  UnarchiveButton,
} from "@/styles/callsList.styled";
import { handlearchive } from "@/api/archiveHandler";
import { Call } from "@/types/Models";
import { Heading, HeadingWrapper } from "@/styles/calls.styled";
import {
  renderActions,
  renderDirection,
  renderCallType,
} from "@/components/callComponents";
import handleCalls from "@/api/callsHandler";
import { AnyComponent } from "styled-components/dist/types";

const { Option } = Select;

const CallsList: React.FC = () => {
  const [filter, setFilter] = useState("All");
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

  const handleUpdateCall = (record: Call) => {
    setfilteredCalls((prevCalls) => {
      return prevCalls.map((call) => {
        if (call.id === record.id) {
          call.is_archived = record.is_archived;
        }
        return call;
      });
    });
  };

  const handleFilterChange = (selectedValue: SetStateAction<string>) => {
    setFilter(selectedValue);

    try {
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
      console.log("Error in filtering calls", error);
    }
  };

  const renderPagination = () => {
    return (
      <StyledPagination
        total={filteredcalls.length}
        pageSize={rowsPerPage}
        defaultCurrent={1}
        current={page}
        onChange={setPage}
        showSizeChanger={false}
        showQuickJumper={false}
      />
    );
  };

  const getPaginatedData = () => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredcalls.slice(startIndex, endIndex);
  };

  if (loading) {
    return (
      <HeadingWrapper>
        <Heading level={5}>Loading...Please wait</Heading>
      </HeadingWrapper>
    );
  }

  if (filteredcalls.length === 0) {
    return <div>No calls available.</div>;
  }

  const columnsdata: any = [
    {
      dataIndex: "call_type",
      title: "Call Type",
      render: (_: any, record: Call) => renderCallType(_, record),
    },
    {
      dataIndex: "direction",
      title: "Direction",
      render: (_: any, record: Call) => renderDirection(_, record),
    },
    { dataIndex: "duration", title: "Duration" },
    { dataIndex: "from", title: "From" },
    { dataIndex: "to", title: "To" },
    { dataIndex: "via", title: "Via" },
    { dataIndex: "created_at", title: "Created At" },
    {
      dataIndex: "is_archived",
      title: "Is Archived",
      render: (_: any, record: Call) => {
        const handleArchiveCallback = async () => {
          try {
            const updatedIsArchived: Call = await handlearchive(record);
            if (updatedIsArchived.is_archived) {
              handleUpdateCall(updatedIsArchived);
              notification.success({
                message: "Call Archived!",
                duration: 1, // Duration in seconds for pop up
              });
            } else {
              handleUpdateCall(updatedIsArchived);
              notification.success({
                message: "Call Unarchived!",
                duration: 1, // Duration in seconds for pop up
              });
            }
          } catch (error) {
            console.log("Error occurred while archiving:", error);
          }
        };

        return (
          <>
            {record.is_archived ? (
              <ArchiveButton onClick={handleArchiveCallback} type="link">
                Archived
              </ArchiveButton>
            ) : (
              <UnarchiveButton onClick={handleArchiveCallback} type="link">
                Unarchived
              </UnarchiveButton>
            )}
          </>
        );
      },
    },
    {
      dataIndex: "actions",
      title: "Actions",
      render: (_: any, record: Call) => renderActions(_, record),
    },
  ];

  return (
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
      <CenteredWrapper>
        <StyledTable
          dataSource={getPaginatedData()}
          columns={columnsdata}
          pagination={false}
          footer={() => (renderPagination())}
        />
      </CenteredWrapper>
    </TableContainer>
  );
};

export default CallsList;
