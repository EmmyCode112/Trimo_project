import React, { useState, useRef, useEffect } from "react";
import Button from "../../Components/buttons/transparentButton";
import { Icons } from "../../assets/assets";
import ContactsTable from "./ContactsTable";
import EditContactModal from "./EditContactModal";
import DeleteModal from "./DeleteModal";
import DeleteMultipleModal from "./DeleteMultipleModal";
import CreateContactModal from "./CreateContactModal";
import CreateFormModal from "./CreateFormModal";
import AvailableGroupModal from "./AvailableGroupModal";
import ImportContact from "./ImportContact";
import { useNavigate } from "react-router-dom";
import { useGroups } from "../../redux/GroupProvider/UseGroup";

const Contact = () => {
  const navigate = useNavigate();
  const [openDropdownRow, setOpenDropdownRow] = useState(null);
  const [isOpenEditModal, setIsOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [openCreateContactModal, setOpenCreateContactModal] = useState(false);
  const [openCreateFormModal, setOpenCreateFormModal] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [availableGroup, setAvailableGroup] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [openDeleteMultipleModal, setOpenDeleteMultipleModal] = useState(false);
  const { groups, setGroups } = useGroups();
  const dropdownRef = useRef(null);
  const actionDropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: "Timothy",
      lastName: "Eke",
      email: "andrew@triimo.com",
      phone: "+234 792 241 5655",
      group: "N/A",
    },
    {
      id: 2,
      firstName: "Naomi",
      lastName: "Aganaba",
      email: "tanoribeau@gmail.com",
      phone: "+234 704 442 5317",
      group: "N/A",
    },
    {
      id: 3,
      firstName: "Sarah",
      lastName: "Okano",
      email: "penelope@gmail.com",
      phone: "+234 709 657 6467",
      group: "N/A",
    },
    {
      id: 4,
      firstName: "Daniel",
      lastName: "Ojo",
      email: "owenorton@gmail.com",
      phone: "+234 806 310 3944",
      group: "N/A",
    },
    {
      id: 5,
      firstName: "Rebecca",
      lastName: "Nwachukwu",
      email: "akwabtom@gmail.com",
      phone: "+234 703 501 4280",
      group: "N/A",
    },
    {
      id: 6,
      firstName: "Margaret",
      lastName: "Alanira",
      email: "abujifinast@icloud.com",
      phone: "+234 813 201 1725",
      group: "N/A",
    },
  ]);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedRow(null);
  };

  const handleOpenModal = (rowData) => {
    setIsOpenModal(true);
    setSelectedRow(rowData);
    setOpenDropdownRow(null);
  };

  const updateContact = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    handleCloseModal();
  };

  // delete contact
  const handleOpenDeleteModal = (rowData) => {
    setIsOpenDeleteModal(true);
    setSelectedRow(rowData);
    setOpenDropdownRow(null);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
    console.log(contactId);
    setIsOpenDeleteModal(false);
  };

  // create contact
  const addNewContact = (newContact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { ...newContact, id: prevContacts.length + 1 }, // Ensure unique ID
    ]);
    setOpenCreateFormModal(false);
  };

  // Toggle single row selection
  const toggleRowSelection = (id) => {
    setSelectedRows(
      (prev) =>
        prev.includes(id)
          ? prev.filter((rowId) => rowId !== id) // Deselect if already selected
          : [...prev, id] // Add to selection
    );
  };

  const deleteSelectedRows = () => {
    console.log("Selected rows:", selectedRows);
    setContacts((prev) =>
      prev.filter((contact) => !selectedRows.includes(contact.id))
    );

    setSelectedRows([]);
    setOpenDeleteMultipleModal(false);
    console.log(contacts);
  };

  const openDeleteMultipleModel = () => {
    setActionDropdown(false);
    setOpenDeleteMultipleModal(true);
  };
  const moveToGroup = () => {
    setActionDropdown(false);
    setAvailableGroup(true);
  };

  const moveContactsToGroup = (groupId) => {
    // Find the group name based on the ID
    const group = groups.find((g) => g.id === groupId);
    const groupName = group ? group.name : "N/A"; // Use "N/A" if group not found

    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        selectedRows.includes(contact.id)
          ? { ...contact, group: groupName }
          : contact
      )
    );

    // Update the group with the selected contacts
    setGroups((prevGroups) =>
      prevGroups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              contacts: [
                ...g.contacts,
                ...contacts.filter((contact) =>
                  selectedRows.includes(contact.id)
                ),
              ],
            }
          : g
      )
    );

    setSelectedRows([]); // Clear selection

    // Delay closing the modal by 4 seconds
  };

  // Function to filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Function to handle clicks outside both dropdowns
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      actionDropdownRef.current &&
      !actionDropdownRef.current.contains(event.target)
    ) {
      setOpenDropdownRow(null);
      setActionDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: (
          <img src={Icons.checkbox} alt="checkbox" className="cursor-pointer" />
        ),
        id: "checkbox",
        Cell: ({ row }) => (
          <div onClick={() => toggleRowSelection(row.original.id)}>
            <img
              src={
                selectedRows.includes(row.original.id)
                  ? Icons.checkboxActive
                  : Icons.checkbox
              }
              alt="checkbox"
              className="cursor-pointer"
            />
          </div>
        ),
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email Address",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Associated Group",
        accessor: "group",
      },
      {
        Header: "",
        id: "actions",
        Cell: ({ row }) => (
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() =>
                setOpenDropdownRow((prev) =>
                  prev === row.original.id ? null : row.original.id
                )
              }
              className={`p-2 rounded-[8px] w-[40px] h-[40px] flex items-center justify-center ${
                openDropdownRow === row.original.id ? "bg-[#FAFAFA]" : ""
              }`}
            >
              <img src={Icons.moreIcon} alt="more" className="cursor-pointer" />
            </div>

            {openDropdownRow === row.original.id && (
              <div className="absolute left-[-137px] rounded-[8px] w-[177px] bg-white flex flex-col shadow-md border border-[#E4E7EC] z-10">
                <div
                  className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOpenModal(row.original)}
                >
                  <img src={Icons.editIcon} alt="edit" />
                  <p className="text-[#3F3E3E] text-[14px] font-normal">Edit</p>
                </div>
                <div
                  className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOpenDeleteModal(row.original)}
                >
                  <img src={Icons.trashIcon} alt="delete" />
                  <p className="text-[#3F3E3E] text-[14px] font-normal">
                    Delete
                  </p>
                </div>
              </div>
            )}
          </div>
        ),
      },
    ],
    [openDropdownRow, selectedRows]
  );

  return (
    <div className="px-[31px] py-[32px] flex flex-col gap-[22px]">
      <div
        onClick={() => navigate("/groups")}
        className="cursor-pointer text-[#EBEBF0]"
      >
        <p>Groups</p>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-[20px]">
        <header>
          <h1 className="text-[#1A1A1A] text-[24px] font-medium">
            All Contacts
          </h1>
          <p className="text-[#767676] font-normal text-[15px]">
            View all saved contacts with their details and associated groups at
            a glance.
          </p>
        </header>
        <div className="flex gap-3 justify-end self-end">
          {selectedRows.length > 0 && (
            <div className="relative" ref={actionDropdownRef}>
              <button
                onClick={() => setActionDropdown((prev) => !prev)}
                className="flex rounded-[8px] gap-[11px] border border-[#C1BFD0] py-[10px] px-[18px] text-[#383268] text-[16px] font-medium items-center hover:bg-[#e7e7e7]"
              >
                <span>Action</span>
                <img src={Icons.arrowDown} alt="action" />
              </button>
              {actionDropdown && (
                <div className="absolute bottom-[-190%] right-0 rounded-[8px] w-[177px] bg-white flex flex-col shadow-md border border-[#E4E7EC] z-10">
                  <div
                    className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100"
                    onClick={moveToGroup}
                  >
                    <img src={Icons.groupIcon} alt="group" />
                    <p className="text-[#3F3E3E] text-[14px] font-normal">
                      Move to Group
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100"
                    onClick={openDeleteMultipleModel}
                  >
                    <img src={Icons.trashIcon} alt="delete" />
                    <p className="text-[#3F3E3E] text-[14px] font-normal">
                      Bulk Delete
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <Button
            label="Add New Contact"
            onClick={() => setOpenCreateContactModal(true)}
            className="bg-[#383268] text-white rounded-[8px] py-2 px-[18px] hover:bg-[#41397c] max-sm:px-[12px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-[19px] max-sm:flex-wrap">
        <search className="flex items-center gap-2 px-[10px] rounded-[8px] border border-[#D0D5DD] w-[351px] h-[47px] max-sm:full">
          <img
            src={Icons.searchIcon}
            alt="search"
            className="w-[20px] h-[20px]"
          />
          <input
            type="text"
            placeholder="Search by name, email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1 outline-none w-full h-full"
          />
        </search>
        <div className="flex items-center gap-[19px]">
          <div className="px-[18px] py-[10px] flex items-center gap-[10px] rounded-[8px] border border-[#C1BFD0] cursor-pointer text-[#3F3E3E] hover:bg-[#e7e7e7]">
            <img src={Icons.filterIcon} alt="filter" />
            <p>Filter</p>
          </div>
          <div className="px-[18px] py-[10px] flex items-center gap-[10px] rounded-[8px] border border-[#C1BFD0] cursor-pointer text-[#3F3E3E] hover:bg-[#e7e7e7]">
            <img src={Icons.sortIcon} alt="sort" />
            <p>Sort</p>
          </div>
        </div>
      </div>

      <ContactsTable
        columns={columns}
        data={filteredContacts}
        contacts={contacts}
        isOpenCreateContactModal={() => setOpenCreateContactModal(true)}
      />

      {isOpenEditModal && selectedRow && (
        <EditContactModal
          isOpenEditModal={isOpenEditModal}
          onClose={handleCloseModal}
          rowData={selectedRow}
          onSave={updateContact}
        />
      )}
      {isOpenDeleteModal && selectedRow && (
        <DeleteModal
          isOpenDeleteModal={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
          contact={selectedRow}
          onDelete={deleteContact}
        />
      )}

      {openCreateContactModal && (
        <CreateContactModal
          isOpenCreateContactModal={openCreateContactModal}
          onClose={() => setOpenCreateContactModal(false)}
          onOpenCreateFormModal={() => setOpenCreateFormModal(true)}
          isOpenImportModal={() => setOpenImportModal(true)}
        />
      )}

      {openDeleteMultipleModal && (
        <DeleteMultipleModal
          onClose={() => setOpenDeleteMultipleModal(false)}
          openDeleteModal={openDeleteMultipleModal}
          selectedContacts={selectedRows}
          onDelete={deleteSelectedRows}
        />
      )}

      {openCreateFormModal && (
        <CreateFormModal
          onSubmit={addNewContact}
          contacts={contacts}
          isOpenModal={openCreateFormModal}
          onClose={() => setOpenCreateFormModal(false)}
        />
      )}

      {availableGroup && (
        <AvailableGroupModal
          openAvailableGroups={availableGroup}
          onClose={() => setAvailableGroup(false)}
          moveContactsToGroup={moveContactsToGroup}
        />
      )}

      {openImportModal && (
        <ImportContact
          isOpen={openImportModal}
          onClose={() => setOpenImportModal(false)}
          setContacts={setContacts}
          contacts={contacts}
        />
      )}
    </div>
  );
};

export default Contact;
