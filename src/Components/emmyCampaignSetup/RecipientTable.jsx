import React, { useState } from "react";
import { useTable, usePagination } from "react-table";
import { useRecipients } from "../../redux/UseRecipient";
import { Icons } from "../../assets/assets";
import Button from "../buttons/transparentButton";

const RecipientsTable = ({ openFormModal, openDeleteModal }) => {
  const { recipients, setRecipients } = useRecipients();

  const columns = React.useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Email Address", accessor: "email" },
      { Header: "Phone Number", accessor: "phone" },
      {
        Header: "",
        accessor: "id",
        Cell: ({ value }) => (
          <button onClick={() => openDeleteModal(value)}>
            <img src={Icons.trashIcon} alt="Delete" />
          </button>
        ),
      },
    ],
    []
  );

  const data = recipients;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    { columns, data: recipients, initialState: { pageIndex: 0, pageSize: 6 } },
    usePagination
  );

  if (data.length === 0) {
    return (
      <div className="w-full rounded-[15px] pb-[60px] pt-[23px] px-[20px] flex flex-col gap-[20px]  border-[5px] border-[#F1F1F1]">
        <div className="flex gap-3 justify-between items-center border-b border-b-[#EAECF0] pb-[20px]">
          <div className="flex items-center gap-2 ">
            <h2 className="text-[18px] font-meidium text-[#3F3E3E]">
              Recipients
            </h2>
            <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
              {data.length} {data.length > 1 ? "recipients" : "recipient"}
            </p>
          </div>
          <div>
            <Button
              label="Add Recipient"
              className="rounded-[8px] border border-[#383268] hover:bg-[#383268] hover:text-white text-[#383268]"
              onClick={openFormModal}
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 text-center pt-[30px] pb-[30px]">
          <img src={Icons.emptyState} alt="empty state" />
          <div>
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              No Recipients Found
            </h2>
            <p className="text-[#767676] text-[14px] font-normal md:max-w-2/3">
              It looks like there are no recipients available in this table.
              Please upload a CSV file or manually add recipients to get
              started.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              label="Manually Add Recipient"
              className="rounded-[8px] border border-[#383268] py-2 px-[18px] hover:bg-[#383268] hover:text-white text-[#383268]"
              onClick={openFormModal}
            />
            <Button
              label="Upload CSV"
              className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[15px] py-[20px] px-[20px] flex flex-col gap-[22px]  border-[5px] border-[#F1F1F1]">
      <div className="flex gap-3 justify-between items-center border-b border-b-[#EAECF0] pb-[20px]">
        <div className="flex items-center gap-2 flex-col sm:flex-row">
          <h2 className="text-[18px] font-meidium text-[#3F3E3E]">
            Recipients
          </h2>
          <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
            {data.length} {data.length > 1 ? "recipients" : "recipient"}
          </p>
        </div>
        <div>
          <Button
            label="Add Recipient"
            className="rounded-[8px] border border-[#383268] hover:bg-[#383268] hover:text-white text-[#383268]"
            onClick={openFormModal}
          />
        </div>
      </div>
      <div className="overflow-x-scroll w-full scrollbar-hide">
        <table
          {...getTableProps()}
          className="rounded-[8px] text-left whitespace-nowrap border-collapse w-full"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="bg-[#F9FAFB] py-3 border-b border-b-[#EAECF0]"
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="px-[12px] py-3 text-[13px] font-medium text-[#767676]"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="py-4 border-b border-b-[#EAECF0]"
                >
                  {row.cells.map((cell) => (
                    <td
                      className="py-3 text-[13px] font-medium text-[#767676]"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={previousPage}
          disabled={!canPreviousPage}
          className="flex items-center gap-1 cursor-pointer"
        >
          <img
            src={Icons.arrow_right}
            alt="prev"
            className="hidden md:inline"
          />
          Previous
        </button>
        <p className="text-[#667085] text-[14px] font-medium">
          Page {"  "}
          <span className="px-3 py-1 rounded-lg bg-[#383268] text-white text-[14px] font-medium">
            {" "}
            {pageIndex + 1}
          </span>{" "}
          of {pageOptions.length}
        </p>
        <button
          onClick={nextPage}
          disabled={!canNextPage}
          className="flex items-center gap-1 cursor-pointer"
        >
          Next
          <img
            src={Icons.arrowLeftPagin}
            alt="prev"
            className="hidden md:inline"
          />
        </button>
      </div>
    </div>
  );
};

export default RecipientsTable;
