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
import { useContacts } from "@/redux/ContactProvider/UseContact";
import Toast from "@/Components/Alerts/Toast";
import api from "@/services/api";
const Contact = () => {
  const baseUrl =
    import.meta.env.VITE_BASE_URL ||
    "https://triimo.unifiedpublisher.com/api/v1";
  const {
    contacts,
    setContacts,
    setCreateContactError,
    // createContact,
    setCreateContactErrorMessage,
    RetryToFetchContact,
    setCreateContactLoading,
    deleteContact,
    setDeleteLoading,
  } = useContacts();

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
  const [toast, setToast] = useState({});
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedRow(null);
  };

  const handleOpenModal = (rowData) => {
    setIsOpenModal(true);
    setSelectedRow(rowData);
    setOpenDropdownRow(null);
  };

  // update user
  const updateContact = async (userData) => {
    try {
      setCreateContactLoading(true);
      setCreateContactErrorMessage("");
      const response = await api.post(
        `${baseUrl}/user/contacts/update/${userData.id}`,
        userData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      // console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        console.log("user updated successfully.");
        await RetryToFetchContact();
        handleCloseModal();
      } else {
        throw new Error("Failed to edit user");
      }
      console.log("response", response);

      setToast({
        title: "Updated",
        message: "Contact updated successfully.",
        type: "success",
      });
      setCreateContactErrorMessage("");
    } catch (error) {
      console.error("Error editing user:", error);
      setCreateContactError(error.message || "Failed to edit user");
      const phoneNumberError = error.response?.data?.err_msg?.phone_number;
      const emailError = error.response?.data?.err_msg?.email;
      setCreateContactErrorMessage(
        emailError
          ? emailError[0]
          : phoneNumberError
          ? phoneNumberError[0]
          : "An unexpected error occurred. please check you internet and try again."
      );
    } finally {
      setCreateContactLoading(false);
    }
  };

  // delete contact
  const handleOpenDeleteModal = (rowData) => {
    setIsOpenDeleteModal(true);
    setSelectedRow(rowData);
    setOpenDropdownRow(null);
  };

  const handleDeleteContact = async (contactId) => {
    const success = await deleteContact(contactId);

    if (success) {
      setToast({
        title: "Deleted",
        message: "Contact deleted successfully.",
        type: "success",
      });
      await RetryToFetchContact(); // Refresh contacts list after deletion
      setIsOpenDeleteModal(false); // ✅ Only close if deletion worked
    } else {
      setToast({
        title: "Error",
        message: "Failed to delete contact. Please try again.",
        type: "error",
      });
      // ❌ Don't close modal — give user a chance to retry
    }
  };

  // bulk delete
  // const deleteSelectedRows = () => {
  //   console.log("Selected rows:", selectedRows);
  //   setContacts((prev) =>
  //     prev.filter((contact) => !selectedRows.includes(contact.id))
  //   );

  //   setSelectedRows([]);
  //   setOpenDeleteMultipleModal(false);
  //   console.log(contacts);
  // };

  // Toggle single row selection
  const toggleRowSelection = (id) => {
    setSelectedRows(
      (prev) =>
        prev.includes(id)
          ? prev.filter((rowId) => rowId !== id) // Deselect if already selected
          : [...prev, id] // Add to selection
    );
  };

  const multipleDelete = async () => {
    try {
      setDeleteLoading(true);
      setCreateContactErrorMessage("");
      if (!selectedRows || selectedRows.length === 0) {
        throw new Error("No contacts selected for deletion.");
      }
      const response = await api.post(
        `${baseUrl}/user/contacts/delete-multiple`,
        { contact_id: selectedRows }, // Verify this key matches API expectation
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        console.log("Contacts deleted successfully:", response);
        setSelectedRows([]);
        await RetryToFetchContact();
        setOpenDeleteMultipleModal(false);
        setToast({
          title: "Deleted",
          message: "Contacts deleted successfully.",
          type: "success",
        });
      } else {
        throw new Error("Failed to delete contacts");
      }
    } catch (error) {
      console.error("Error deleting contacts:", error.response?.data || error);
      setCreateContactError(error.message || "Failed to delete contacts");
      setToast({
        title: "Error",
        message: `Failed to delete contacts.Please try again.`,
        type: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // create contact
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    lastname: "",
    phone_number: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateContactLoading(true);
    setCreateContactError(null);
    setCreateContactErrorMessage("");

    try {
      const response = await api.post(
        `${baseUrl}/user/contacts/create`,
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      // Refresh contacts list after successful creation
      await RetryToFetchContact();

      // Clear form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
      });

      setToast({
        title: "Created",
        message: `Contact created successfully.`,
        type: "success",
      });

      setOpenCreateFormModal(false);
    } catch (error) {
      console.error("Error creating contact:", error);
      setCreateContactError(error.message || "Failed to create contact");

      const phoneNumberError = error.response?.data?.err_msg?.phone_number;
      const emailError = error.response?.data?.err_msg?.email;
      const err_msg = error.response?.data?.msg;

      setCreateContactErrorMessage(
        emailError
          ? emailError[0]
          : phoneNumberError
          ? phoneNumberError[0]
          : err_msg ||
            "An unexpected error occurred. Please check your internet and try again."
      );
    } finally {
      setCreateContactLoading(false);
    }
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
    const group = groups.find((g) => g.id === groupId);
    const groupName = group ? group.name : "N/A";

    let hasDuplicate = false;
    let hasValidMove = false;

    const updatedContacts = contacts.map((contact) => {
      if (!selectedRows.includes(contact.id)) return contact;

      // Check if this contact already exists in the group with same info
      const duplicate = group.contacts.find(
        (c) =>
          c.email === contact.email &&
          c.firstname === contact.firstname &&
          c.lastname === contact.lastname
      );

      if (duplicate) {
        hasDuplicate = true;
        return contact; // Skip moving
      } else {
        hasValidMove = true;
        return { ...contact, group: groupName };
      }
    });

    setContacts(updatedContacts);

    // Only add non-duplicate contacts to the group
    const newContactsToAdd = contacts.filter((contact) => {
      return (
        selectedRows.includes(contact.id) &&
        !group.contacts.some(
          (c) =>
            c.email === contact.email &&
            c.firstname === contact.firstname &&
            c.lastname === contact.lastname
        )
      );
    });

    setGroups((prevGroups) =>
      prevGroups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              contacts: [...g.contacts, ...newContactsToAdd],
            }
          : g
      )
    );

    // Show toast
    if (hasValidMove) {
      setSelectedRows([]);
      setToast({
        title: "Success",
        message: "Contacts moved to group successfully.",
        type: "success",
      });
    } else if (hasDuplicate) {
      setToast({
        title: "Warning",
        message: "Some contacts already exist in this group.",
        type: "warning",
      });
    } else {
      setToast({
        title: "Error",
        message: "No contacts were moved.",
        type: "error",
      });
    }
  };

  // Function to filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstname} ${contact.lastname}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Function to handle clicks outside both dropdowns
  useEffect(() => {
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
    console.log("dropdownRef", dropdownRef);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const getGroupName = (contactId) => {
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact?.group || "N/A";
  };

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
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastname",
      },
      {
        Header: "Email Address",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
      },
      {
        Header: "Associated Group",
        Cell: ({ row }) => getGroupName(row.original.id),
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
    [openDropdownRow, selectedRows, dropdownRef]
  );

  return (
    <div className="px-[31px] py-[32px] flex flex-col gap-[22px]">
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

      {toast.title && (
        <Toast
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({})}
        />
      )}

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
          onDelete={handleDeleteContact}
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
          onDelete={multipleDelete}
        />
      )}

      {openCreateFormModal && (
        <CreateFormModal
          onSubmit={handleSubmit}
          setFormData={setFormData}
          formData={formData}
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
