import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";

const EditContactModal = ({
  isOpenEditModal,
  onClose,
  rowData,
  onSave,
  existingContacts,
}) => {
  console.log("contats", existingContacts);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpenEditModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenEditModal, onClose]);

  // Handle dragging down on mobile to close
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

  // Form state
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!rowData) return;

    const hasFormChanged = Object.keys(formValues).some(
      (key) => formValues[key].trim() !== (rowData[key] || "").trim()
    );

    setHasChanges(hasFormChanged);
    setIsSaveDisabled(!hasFormChanged);
  }, [formValues, rowData]);

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateWorkPhone = (phone) => {
    return phone.length > 0 && /^\d+$/.test(phone);
  };

  useEffect(() => {
    if (rowData) {
      setFormValues((prev) => ({
        ...prev,
        firstName: rowData.firstname || prev.firstName,
        lastName: rowData.lastname || prev.lastName,
        email: rowData.email || prev.email,
        phone: rowData.phone_number || prev.phone,
      }));
    }
  }, [rowData]);

  useEffect(() => {
    if (!rowData) return;

    const hasFormChanged = Object.keys(formValues).some(
      (key) => formValues[key].trim() !== (rowData[key] || "").trim()
    );

    const hasEmptyFields = Object.values(formValues).some(
      (value) => value.trim() === ""
    );

    setHasChanges(hasFormChanged);
    setIsSaveDisabled(!hasFormChanged || hasEmptyFields);
  }, [formValues, rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      const updatedValues = { ...prev, [name]: value };

      // Check if form has changed
      const hasFormChanged = Object.keys(updatedValues).some(
        (key) => updatedValues[key].trim() !== (rowData[key] || "").trim()
      );

      setHasChanges(hasFormChanged);
      setIsSaveDisabled(!hasFormChanged);

      return updatedValues;
    });

    setError(null);
  };

  const handleSave = () => {
    const { firstName, lastName, email, phone } = formValues;
    const isDuplicate = existingContacts.some((contact) => {
      if (!rowData) return false; // Prevent undefined error
      return (
        contact.id !== rowData.id &&
        (contact.email.trim().toLowerCase() === email.trim().toLowerCase() ||
          contact.phone.trim() === phone.trim() ||
          (contact.firstName.trim().toLowerCase() ===
            firstName.trim().toLowerCase() &&
            contact.lastName.trim().toLowerCase()))
      );
    });

    if (isDuplicate) {
      const duplicateContact = existingContacts.find(
        (contact) =>
          contact.id !== rowData.id &&
          (contact.email === email ||
            contact.phone === phone ||
            (contact.firstName === firstName && contact.lastName === lastName))
      );

      if (duplicateContact) {
        if (duplicateContact.email === email) {
          setError("email");
        } else if (duplicateContact.phone === phone) {
          setError("phone");
        } else if (
          duplicateContact.firstName === firstName &&
          duplicateContact.lastName === lastName
        ) {
          setError("name");
        }
        return;
      }
    }

    // Updated contact object
    const updatedContact = { ...formValues, id: rowData?.id };

    console.log("Updated Contact:", updatedContact); // Log the updated contact

    onSave(updatedContact); // Call the save function
    onClose(); // Close the modal
  };

  if (!isOpenEditModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white overflow-y-scroll hide-scrollBar ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[30px] p-3"
            : "top-4 bottom-4 right-3 w-[517px] rounded-[30px] p-[22px]"
        }`}
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
        onTouchMove={handleDragMove}
        onMouseMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseUp={handleDragEnd}
      >
        {isMobile && (
          <div className="w-[81px] h-2 bg-gray-300 rounded-full mx-auto mt-4" />
        )}

        <div className="flex flex-col">
          <div>
            <h2 className="font-medium text-[18px] text-[#1A1A1A] mb-[6px]">
              Edit Contact Info
            </h2>
            <p className="text-[14px] font-normal text-[#767676]">
              Add recipients one by one for quick updates or smaller campaigns.
            </p>
          </div>
          <form className="mt-[28px] flex flex-col gap-[20px] h-full">
            <div className="flex flex-col gap-y-[18px]">
              <label className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#1A1A1A]">
                  First Name
                </p>
                <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
                  <img
                    src={Icons.profile}
                    alt="first name"
                    className="signin-icons"
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleInputChange}
                    className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#1A1A1A]">
                  Last Name
                </p>
                <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
                  <img
                    src={Icons.profile}
                    alt="last name"
                    className="signin-icons"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleInputChange}
                    className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#1A1A1A]">Email</p>
                <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
                  <img
                    src={Icons.smsIcon}
                    alt="email"
                    className="signin-icons"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#1A1A1A]">
                  Phone Number
                </p>
                <div className="flex gap-2 px-4 py-2 border border-gray-300 rounded-lg items-center">
                  <img
                    src={Icons.naira}
                    alt="country code"
                    className="signin-icons"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                  />
                </div>
              </label>

              <div>
                {error && (
                  <div className="flex bg-[#FBF1E6] items-start border justify-between  mt-[40px] border-[#E29133] gap-3 p-4 rounded-[8px]">
                    <div className="flex gap-3 items-start">
                      <img src={Icons.errorWarningIcon} alt="error" />
                      <div>
                        <p className="text-[#DB7500] text-[14px] font-medium">
                          Duplicate Entry
                        </p>
                        <p className="text-[#C76A00] text-[14px] font-normal">
                          This contact {error} is already in your list. Avoid
                          duplicates to streamline delivery.
                        </p>
                      </div>
                    </div>
                    <img
                      src={Icons.closeXIcon}
                      alt=""
                      className="cursor-pointer "
                      onClick={() => setError(null)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="self-end align-end flex items-center gap-3">
              <Button
                label="Cancel"
                onClick={onClose}
                className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0]"
              />
              <Button
                label="Save"
                onClick={handleSave}
                disabled={isSaveDisabled}
                className={`rounded-[8px] border border-[#C1BFDO] bg-[#383268] hover:bg-[#41397c] text-white`}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
