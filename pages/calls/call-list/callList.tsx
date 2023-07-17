import React, { useState, useEffect } from "react";
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
  CustomSpin,
  SpinIcon,
  StyledSpan,
} from "./elements";
import { handlearchive } from "@/api/archiveHandler";
import handleCalls from "@/api/callsHandler";
import { Call, CallResponse } from "@/models/types";
import CallDetailsPopup from "@/pages/calls/call-details/callDetails";
import { ColumnsType, TablePaginationConfig } from "antd/es/table/interface";
import { SpinIndicator } from "antd/es/spin";
import { globalTheme } from "@/styles/theme";

const { Option } = Select;

import { NextRouter, useRouter } from "next/router";

const CallsList: React.FC = () => {
  //state variables
  const rowsPerPage: number = 6;
  const [filter, setFilter] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const [calls, setCalls] = useState<Call[]>([]);
  const [filteredcalls, setfilteredCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalcount, setTotalCount] = useState<number>(0);
  const router: NextRouter = useRouter();

  // Options for filter select
  const options: {
    value: string;
    label: string;
  }[] = [
    { value: "All", label: "All" },
    { value: "Archived", label: "Archived" },
    { value: "Unarchived", label: "Unarchived" },
  ];
  const handlePaginationChange = (newPage: number) => {
    setPage(newPage);
    setLoading(true);
    const offset: number = (newPage - 1) * 6;
    const limit: number = (newPage - 1) * 6 + 6;
    fetchData(offset, limit);
  };

  // Configuration for pagination
  const paginationConfig: TablePaginationConfig = {
    total: totalcount,
    pageSize: rowsPerPage,
    defaultCurrent: 1,
    current: page,
    onChange: handlePaginationChange,
    showSizeChanger: false,
    showQuickJumper: false,
  };

  //function to fetch data based on offset and limit
  const fetchData = async (offset: number, limit: number): Promise<void> => {
    try {
      // Fetch calls data from API
      const token: string | null = localStorage.getItem("access_token");
      if (!token) {
        router.push("/");
      }
      const callsData: CallResponse | undefined = await handleCalls(
        offset,
        limit
      );
      if (callsData) {
        setLoading(false);
        setTotalCount(callsData.totalCount);
        setCalls(callsData.nodes);
        setfilteredCalls(callsData.nodes);
      }
    } catch (error) {
      alert(`Error fetching data:${error}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    const offset: number = (page - 1) * 6;
    const limit: number = (page - 1) * 6 + 6;
    setLoading(true);
    fetchData(offset, limit);
  }, []);

  // Update the archived status of the call in filteredCalls state
  const handleUpdateCall = (record: Call): void => {
    setfilteredCalls((prevCalls) => {
      return prevCalls.map((call) => {
        if (call.id === record.id) {
          call.is_archived = record.is_archived;
        }
        return call;
      });
    });
  };

  //filter calls based on chosen filter value
  const handleFilterChange = (selectedValue: unknown): void => {
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
      alert(`Error fetching data:${error}`);
    }
  };

  const getPaginatedData = (): Call[] => {
    // return the paginated data
    return filteredcalls;
  };

  // Function to render the call type column
  function renderCallType(record: Call): JSX.Element {
    let callType: string = "";
    let color = "";

    if (record.call_type === "voicemail") {
      callType = "Voicemail";
      color =  globalTheme.colors.tableColor;
    } else if (record.call_type === "answered") {
      callType = "Answered";
      color =  globalTheme.colors.archiveText;
    } else if (record.call_type === "missed") {
      callType = "Missed";
      color =  globalTheme.colors.dangerColor;
    }

    return <span style={{ color }}>{callType}</span>;
  }

  // Function to render the direction column
  function renderDirection(record: Call): JSX.Element {
    return (
      <StyledSpan>
        {record.direction === "inbound" ? "Inbound" : "Outbound"}
      </StyledSpan>
    );
  }

  // Function to render the actions column
  function renderActions(record: Call): JSX.Element {
    return <CallDetailsPopup call={record} />;
  }

  if (loading) {
    // Display loading message while fetching data
    const anticon: SpinIndicator = <CustomSpin />;
    return <SpinIcon indicator={anticon}></SpinIcon>;
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
      render: (_: Call, record: Call) => renderCallType(record),
    },
    {
      dataIndex: "direction",
      title: "Direction",
      render: (_: Call, record: Call) => renderDirection(record),
    },
    { dataIndex: "duration", title: "Duration" },
    { dataIndex: "from", title: "From" },
    { dataIndex: "to", title: "To" },
    { dataIndex: "via", title: "Via" },
    { dataIndex: "created_at", title: "Created At" },
    {
      dataIndex: "is_archived",
      title: "Is Archived",
      render: (_: Call, record: Call) => {
        const handleArchiveCallback = async (): Promise<void> => {
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
            alert(`Error fetching data:${error}`);
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
      render: (_: Call, record: Call) => renderActions(record),
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
