import { useEffect, useRef, useState, useMemo } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import GroupsContactsTable from "./GroupsContactsTable";
import CreateContactModal from "./CreateContactModal";
import CreateFormModal from "./CreateFormModal";
import Button from "../../Components/buttons/transparentButton";
import DeleteMultipleModal from "./DeleteMultipleModal";
import DeleteModal from "./DeleteModal";

const FolderDetailModal = ({
  open,
  onClose,
  folder,
  setOpenCreateFormModal,
  openCreateFormModal,
  setGroups,
}) => {
  const [openDropdownRow, setOpenDropdownRow] = useState(null);
  const [openCreateNewContact, setOpenCreateNewContact] = useState(false);
  const [contacts, setContacts] = useState(folder.contacts || []);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isOpenMultipleDelete, setIsOpenMultipleDelete] = useState(false);
  const [isOpenSingleDelete, setIsOpenSingleDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const modalRef = useRef(null);
const deleteModalRef = useRef(null); // Ref for DeleteModal
const createContactModalRef = useRef(null); // Ref for CreateContactModal
const createFormModalRef = useRef(null); 
const isDeleteSingleModalRef = useRef(null)
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        (!openCreateNewContact ||
          (createContactModalRef.current &&
            !createContactModalRef.current.contains(event.target))) &&
        (!openCreateFormModal ||
          (createFormModalRef.current &&
            !createFormModalRef.current.contains(event.target))) &&
            (!isOpenSingleDelete ||
              (isDeleteSingleModalRef.current &&
                !isDeleteSingleModalRef.current.contains(event.target))) &&
        (!isOpenMultipleDelete ||
          (deleteModalRef.current &&
            !deleteModalRef.current.contains(event.target)))
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    open,
    onClose,
    openCreateNewContact,
    openCreateFormModal,
    isOpenMultipleDelete,
    isOpenSingleDelete
  ]);





  const handleDragStart = (e) => {
    if (!isMobile) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragRef.current = { startY: clientY };
  };

  const handleDragMove = (e) => {
    if (!dragRef.current || !isMobile || !modalRef.current) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = clientY - dragRef.current.startY;

    if (delta > 100) {
      onClose();
      dragRef.current = null;
    } else {
      modalRef.current.style.transform = `translateY(${Math.max(0, delta)}px)`;
    }
  };

  const handleDragEnd = () => {
    if (!modalRef.current || !isMobile) return;
    modalRef.current.style.transform = "";
    dragRef.current = null;
  };

  const toggleSelectContact = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
  };

  const deleteSelectedContacts = () => {
    setContacts((prev) =>
      prev.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
  };

  const addNewContact = (newContact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { ...newContact, id: prevContacts.length + 1 }, // Ensure unique ID
    ]);
    setOpenCreateFormModal(false);
  };

  useEffect(() => {
    console.log("Updated contacts:", contacts);
  }, [contacts]);

 // Handle the deletion of a single contact
 const handleDeleteContact = () => {
  if (selectedRow !== null) {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== selectedRow)
    );
    setIsOpenSingleDelete(false);
    setSelectedRow(null); // Reset the selected row
    console.log("Deleted Contact ID:", selectedRow);
  } else {
    console.log("No contact selected for deletion.");
  }
};

// Open delete modal and set selected row
const openDeleteModal = (id) => {
  setSelectedRow(id);
  setIsOpenSingleDelete(true);
  setOpenDropdownRow(null);
  console.log(setSelectedRow(id))
};

  const columns = useMemo(
    () => [
      {
        Header: (
          <img src={Icons.checkbox} alt="checkbox" className="cursor-pointer" />
        ),
        id: "checkbox",
        Cell: ({ row }) => (
          <div
            onClick={() => toggleSelectContact(row.original.id)}
            className="cursor-pointer"
          >
            <img
              src={
                selectedContacts.includes(row.original.id)
                  ? Icons.checkboxActive
                  : Icons.checkbox
              }
              alt="checkbox"
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
        Cell: () => <span>{folder?.name || "No Group"}</span>,
      },
      {
        Header: "",
        id: "actions",
        Cell: ({ row }) => {
          return (
            <div className="relative">
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
                <img
                  src={Icons.moreIcon}
                  alt="more"
                  className="cursor-pointer"
                />
              </div>

              {openDropdownRow === row.original.id && (
                <div className="absolute left-[-137px] rounded-[8px] w-[177px] bg-white flex flex-col shadow-md border border-[#E4E7EC] z-10">
                  <div className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100">
                    <img src={Icons.editIcon} alt="edit" />
                    <p className="text-[#3F3E3E] text-[14px] font-normal">
                      Edit
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100"
                    onClick={()=>openDeleteModal(row.original.id)}
                  >
                    <img src={Icons.trashIcon} alt="delete" />
                    <p className="text-[#3F3E3E] text-[14px] font-normal">
                      Delete
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        },
      },
    ],
    [openDropdownRow, selectedContacts]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white overflow-y-scroll hide-scrollBar ${
          isMobile
            ? "inset-x-0 h-full bottom-0 rounded-t-[40px] p-3"
            : "top-4 bottom-4 right-3 w-[1000px] rounded-[30px] p-[22px]"
        }`}
      >
        <div className="flex flex-col justify-between h-full w-full gap-y-[30px] pb-[22px]">
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center justify-between max-md:flex-wrap">
              <div>
                <h2 className="text-[18px] font-medium text-[#1A1A1A]">
                  {folder?.name || "No Folder Selected"}
                </h2>
                <p className="text-[#767676] text-[14px] font-normal">
                  Explore and add from your uploaded lists to build this group.
                </p>
              </div>
              <div className="flex items-center gap-2 px-[10px] rounded-[8px] border border-[#D0D5DD] w-[351px] h-[47px] max-sm:full">
                <img
                  src={Icons.searchIcon}
                  alt="search"
                  className="w-[20px] h-[20px]"
                />
                <input
                  type="text"
                  placeholder="Search by name, email"
                  className="p-1 outline-none w-full h-full"
                />
              </div>
            </div>
            <GroupsContactsTable
              columns={columns}
              data={contacts}
              isOpenCreateContactModal={() => setOpenCreateNewContact(true)}
            />
          </div>

          <div className="self-end align-end flex items-center gap-3 pb-[22px]">
            <Button
              label="Cancel"
              onClick={onClose}
              className="text-[#383268] text-[14px] font-normal border border-[#C1BFD0] rounded-[8px] 
           hover:bg-[#383268] hover:text-white transition-all duration-300"
            />

            {selectedContacts.length > 0 && (
              <Button
                label="Delete Contact"
                onClick={() => setIsOpenMultipleDelete(true)}
                className="rounded-[8px] bg-[#CB1E33] text-white"
              />
            )}
          </div>
        </div>
      </div>

      {openCreateNewContact && (
        <CreateContactModal
          isOpenCreateContactModal={() => setOpenCreateNewContact(true)}
          onClose={() => setOpenCreateNewContact(false)}
          onOpenCreateFormModal={() => setOpenCreateFormModal(true)}
        />
      )}

      {openCreateFormModal && (
        <CreateFormModal
          onSubmit={addNewContact}
          isOpenModal={openCreateFormModal}
          onClose={() => setOpenCreateFormModal(false)}
          group={folder?.name}
          contacts={contacts}
        />
      )}

      {isOpenMultipleDelete && (
        <DeleteMultipleModal
          openDeleteModal={() => setIsOpenMultipleDelete(true)}
          onClose={() => setIsOpenMultipleDelete(false)}
          onDelete={deleteSelectedContacts}
          selectedContacts={selectedContacts}
        />
      )}
      {isOpenSingleDelete && (
        <DeleteModal
          isOpenDeleteModal={() => setIsOpenSingleDelete(true)}
          onClose={() => setIsOpenSingleDelete(false)}
          onDelete={() => handleDeleteContact(selectedRow)} 
        />
      )}
    </div>
  );
};

export default FolderDetailModal;
