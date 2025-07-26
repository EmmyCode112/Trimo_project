import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import { useContacts } from "@/redux/ContactProvider/UseContact";
import { IoMdRefresh } from "react-icons/io";
const ContactsTable = ({
  columns,
  data,
  isOpenCreateContactModal,
  contacts,
}) => {
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
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 6 },
    },
    usePagination
  );

  const { loading, error, RetryToFetchContact, refetching, noContact } =
    useContacts();

  if (refetching) {
    return (
      <div className="w-full h-auto min-h-auto lg:h-[500px] rounded-[15px] pb-[60px] pt-[23px] border-[5px] border-[#EAECF0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-[20px]">
          <div className="data-load-spinner"></div>
          <div className="flex flex-col items-center gap-2 text-center ">
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              Retrying to Fetch Contacts...
            </h2>
            <p className="text-[#767676] text-[14px] font-normal">
              Please wait while we try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (
    noContact !== "Contacts not Available!" &&
    error &&
    error !== "Request failed with status code 404"
  ) {
    return (
      <div className="w-full h-auto min-h-auto lg:h-[500px] rounded-[15px] pb-[60px] pt-[23px] border-[5px] border-[#EAECF0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-[20px]">
          <img src={Icons.emptyState} alt="empty state" />
          <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
            Error Fetching Contacts
          </h2>
          <p className="text-[#767676] text-[14px] font-normal">{error}</p>
          <Button
            label={
              <p className="flex items-center gap-1">
                <IoMdRefresh className="text-[20px]" />
                Retry
              </p>
            }
            className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
            onClick={() => RetryToFetchContact()}
          />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-auto min-h-auto lg:h-[500px] rounded-[15px] pb-[60px] pt-[23px] border-[5px] border-[#EAECF0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-[20px]">
          <div className="data-load-spinner"></div>
          <div className="flex flex-col items-center gap-2 text-center ">
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              Loading Contacts...
            </h2>
            <p className="text-[#767676] text-[14px] font-normal">
              Please wait while we fetch your contacts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If there's no data, display a message or an alternative component
  if (
    noContact === "Contacts not Available!" &&
    contacts.length === 0 &&
    !loading &&
    data.length === 0
  ) {
    return (
      <div className="w-full rounded-[15px] h-auto min-h-auto lg:h-[500px] pb-[60px] pt-[23px] flex flex-col gap-[20px] border-[5px] border-[#EAECF0]">
        <div className="flex items-center gap-2 border-b border-b-[#EAECF0] pb-[23px] px-[20px]">
          <h2 className="text-[18px] font-meidium text-[#3F3E3E]">Contact</h2>
          <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
            {contacts.length} Contacts
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 text-center px-[20px]">
          <img src={Icons.emptyState} alt="empty state" />
          <div>
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              No Available Contacts
            </h2>
            <p className="text-[#767676] text-[14px] font-normal">
              No contact found. add new Contact.
            </p>
          </div>
          <Button
            label="Add New Contact"
            className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
            onClick={isOpenCreateContactModal}
          />
        </div>
      </div>
    );
  }

  // If there's no data, display a message or an alternative component
  if (contacts.length === 0) {
    return (
      <div className="w-full rounded-[15px] h-auto min-h-auto lg:h-[500px] pb-[60px] pt-[23px] flex flex-col gap-[20px] border-[5px] border-[#EAECF0]">
        <div className="flex items-center gap-2 border-b border-b-[#EAECF0] pb-[23px] px-[20px]">
          <h2 className="text-[18px] font-meidium text-[#3F3E3E]">Contact</h2>
          <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
            {contacts.length} Contacts
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 text-center px-[20px]">
          <img src={Icons.emptyState} alt="empty state" />
          <div>
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              No Available Contacts
            </h2>
            <p className="text-[#767676] text-[14px] font-normal">
              No contact found. add new Contact.
            </p>
          </div>
          <Button
            label="Add New Contact"
            className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
            onClick={isOpenCreateContactModal}
          />
        </div>
      </div>
    );
  }

  // If there's no data, display a message or an alternative component
  if (data.length === 0) {
    return (
      <div className="w-full h-auto min-h-auto lg:h-[500px] rounded-[15px] pb-[60px] pt-[23px] border-[5px] border-[#EAECF0]">
        <div className="flex flex-col gap-[20px] w-full lg:h-full ">
          <div className="flex items-center gap-2 border-b border-b-[#EAECF0] pb-[23px] px-[20px]">
            <h2 className="text-[18px] font-meidium text-[#3F3E3E]">Contact</h2>
            <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
              {data.length} Contacts
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 text-center px-[20px] h-full w-full">
            <img src={Icons.emptyUsers} alt="empty state" />
            <div>
              <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
                No users found
              </h2>
              <p className="text-[#767676] text-[14px] font-normal w-full md:max-w-[80%] lg:max-w-[63%] mx-auto">
                Use the search bar or filters to find specific users or ensure
                your spellings are correct.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full rounded-[15px] pb-[60px] pt-[23px] flex flex-col gap-[20px] border-[5px] border-[#EAECF0] overflow-x-scroll hide-scrollBar">
        {/* Data Length */}
        <div className="flex items-center gap-2 border-b border-b-[#EAECF0] pb-[23px] px-[20px] ">
          <h2 className="text-[18px] font-meidium text-[#3F3E3E]">Contact</h2>
          <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
            {data.length} Contacts
          </p>
        </div>

        <div className="overflow-x-scroll hide-scrollBar w-full pb-[70px] px-5">
          {/* Table */}
          <table
            {...getTableProps()}
            className="w-full border-collapse border-spacing-0 whitespace-nowrap text-left"
          >
            <thead className="bg-[#F9FAFB]">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-left py-[10px]"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="pl-6 py-[10px] border-b-[#EAECF0] border-b text-[#667085] text-[13px] font-medium"
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
                  <tr {...row.getRowProps()} className="">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="pl-6 py-[10px] border-b-[#EAECF0] border-b text-[#475467] text-[14px] font-normal"
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

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 px-5">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="cursor-pointer text-[#667085] hover:text-[#1A1A1A] text-[14px] font-medium flex items-center gap-2"
          >
            <img src={Icons.arrow_right} alt="prev" />
            Prev
          </button>

          <p className="text-[#667085] text-[14px] font-medium">
            Page{" "}
            <span className="px-3 py-1 rounded-lg bg-[#383268] text-white text-[14px] font-medium">
              {" "}
              {pageIndex + 1}
            </span>{" "}
            of {pageOptions.length}
          </p>

          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="cursor-pointer text-[#667085] hover:text-[#1A1A1A] text-[14px] font-medium flex items-center gap-2"
          >
            Next
            <img src={Icons.arrowLeftPagin} alt="next" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactsTable;
