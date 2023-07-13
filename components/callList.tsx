import React, { useState, useEffect} from "react";
import { Select, notification } from "antd";
import {
  TableContainer,
  FilterContainer,
  StyledTable,
  FormContainer,
  StyledSelect,
  FormItem,
  CenteredWrapper,
  Filter,
  ArchiveButton,
  UnarchiveButton,
} from "@/styles/callsList.styled";
import { handlearchive } from "@/api/archiveHandler";
import handleCalls from "@/api/callsHandler";
import { Call } from "@/models/types";
import { Heading, HeadingWrapper } from "@/styles/calls.styled";
import {
  renderActions,
  renderDirection,
  renderCallType,
} from "@/components/callComponents";

const { Option } = Select;

const CallsList: React.FC = () => {
  //state variables
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState<number>(1);
  const [calls, setCalls] = useState<Call[]>([]);
  const [filteredcalls, setfilteredCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const rowsPerPage = 6;

  // Options for filter select
  const options = [
    { value: "All", label: "All" },
    { value: "Archived", label: "Archived" },
    { value: "Unarchived", label: "Unarchived" },
  ];

  // Configuration for pagination
  const paginationConfig = {
    total: filteredcalls.length,
    pageSize: rowsPerPage,
    defaultCurrent: 1,
    current: page,
    onChange: setPage,
    showSizeChanger: false,
    showQuickJumper: false,
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        // Fetch calls data from API
        const callsData: Call[] | undefined = await handleCalls();
        if (callsData) {
          setLoading(false);
          setCalls(callsData);
          setfilteredCalls(callsData);
        }
      } catch (error) {
        console.log("Error in fetching calls", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateCall = (record: Call) => {
    // Update the archived status of the call in filteredCalls state
    setfilteredCalls((prevCalls) => {
      return prevCalls.map((call) => {
        if (call.id === record.id) {
          call.is_archived = record.is_archived;
        }
        return call;
      });
    });
  };

  const handleFilterChange = (selectedValue: unknown) => {
    if (typeof selectedValue === "string") {
      setFilter(selectedValue);
    }
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
    } catch (error) {
      console.log("Error in filtering calls", error);
    }
  };

  const getPaginatedData = () => {
    // Get the paginated data based on the current page and rows per page
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredcalls.slice(startIndex, endIndex);
  };

  if (loading) {
    // Display loading message while fetching data
    return (
      <HeadingWrapper>
        <Heading level={5}>Loading...Please wait</Heading>
      </HeadingWrapper>
    );
  }

  if (filteredcalls.length === 0) {
    // Display message when no calls are available
    return <div>No calls available.</div>;
  }

  // Define the columns for the table
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
            // Handle archiving/unarchiving of the call
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
            <StyledSelect
              value={filter}
              onChange={(value: unknown) => handleFilterChange(value)}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </StyledSelect>
          </FormItem>
        </FormContainer>
      </FilterContainer>
      <CenteredWrapper>
        <StyledTable
          dataSource={getPaginatedData()}
          columns={columnsdata}
          pagination={paginationConfig}
        />
      </CenteredWrapper>
    </TableContainer>
  );
};

export default CallsList;
