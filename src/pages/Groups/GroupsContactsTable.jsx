import React from "react";
import { useTable, usePagination } from "react-table";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";

const GroupsContactsTable = ({
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

  // If there's no data, display a message or an alternative component
  if (contacts.length === 0) {
    return (
      <div className="w-full rounded-[15px] pb-[60px] pt-[23px] px-[20px] flex flex-col gap-[20px] shadow-md border border-[#EAECF0]">
        <div className="flex items-center gap-2">
          <h2 className="text-[18px] font-meidium text-[#3F3E3E]">Contacts</h2>
          <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium ">
            {data.length} {data.length > 1 ? "Contacts" : "Contact"}
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 text-center">
          <img src={Icons.emptyState} alt="empty state" />
          <div>
            <h2 className="text-xl font-medium text-[#3F3E3E] mb-1">
              No Available Contacts
            </h2>
            <p className="text-[#767676] text-[14px] font-normal">
              No campaigns found. Start your first campaign
            </p>
          </div>
          <Button
            label="Add New Contacts"
            onClick={isOpenCreateContactModal}
            className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:py-1 max-sm:px-[12px]"
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
    <div className="w-auto rounded-[15px] pb-[60px] pt-[23px] px-[20px] flex flex-col gap-[20px] shadow-md border border-[#EAECF0] ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-[18px] font-medium text-[#3F3E3E]">Contacts</h2>
          <p className="bg-[#F5E9EC] py-[2px] px-3 rounded-[18px] text-[#9A2444] text-sm font-medium">
            {data.length} Contacts
          </p>
        </div>
        <Button
          label="Add Contact"
          onClick={isOpenCreateContactModal}
          className="text-[#383268] text-[14px] font-normal border border-[#C1BFD0] rounded-[8px] 
           hover:bg-[#383268] hover:text-white transition-all duration-300"
        />
      </div>
      <div className="overflow-auto hide-scrollBar w-full pb-[70px]">
        <table
          {...getTableProps()}
          className="w-full border-collapse text-left whitespace-nowrap"
        >
          <thead className="bg-[#F9FAFB]">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="pl-6 py-[10px] border-b-[#EAECF0] border-b text-[#919090] text-[13px] font-medium"
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
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="pl-6 py-[10px] border-b-[#EAECF0] border-b text-[#666666] text-[14px] font-normal"
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
          Page {"  "}
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
  );
};

export default GroupsContactsTable;
