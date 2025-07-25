import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Icons } from "../../assets/assets";
import Button from "../../Components/buttons/transparentButton";
import { useContacts } from "@/redux/ContactProvider/UseContact";
const EditContactModal = ({ isOpenEditModal, onClose, rowData, onSave }) => {
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const modalRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dragRef = useRef(null);

  const { createContactLoading, createContactErrorMessage } = useContacts();
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
    firstname: "",
    lastname: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (rowData) {
      setFormValues({
        firstname: rowData.firstname || "",
        lastname: rowData.lastname || "",
        email: rowData.email || "",
        phone_number: rowData.phone_number || "",
      });
    }
  }, [rowData]);

  useEffect(() => {
    if (!rowData) return;

    const hasFormChanged =
      formValues.firstname.trim() !== (rowData.firstname || "").trim() ||
      formValues.lastname.trim() !== (rowData.lastname || "").trim() ||
      formValues.email.trim() !== (rowData.email || "").trim() ||
      formValues.phone_number.trim() !== (rowData.phone_number || "").trim();

    setHasChanges(hasFormChanged);
    setIsSaveDisabled(!hasFormChanged);
  }, [formValues, rowData]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateWorkPhone = (phone) => {
    return phone.length > 0 && /^\d+$/.test(phone);
  };

  const handleSave = () => {
    const updatedContact = { ...rowData, ...formValues };
    onSave(updatedContact);
  };

  if (!isOpenEditModal) return null;

  if (!isOpenEditModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#C7C7C74D] backdrop-blur-[8.1px]">
      <div
        ref={modalRef}
        className={`fixed bg-white ${
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

        <div className="flex flex-col justify-between w-full h-full">
          <div>
            <div>
              <h2 className="font-medium text-[18px] text-[#1A1A1A] mb-[6px]">
                Edit Contact Info
              </h2>
              <p className="text-[14px] font-normal text-[#767676]">
                Add recipients one by one for quick updates or smaller
                campaigns.
              </p>
            </div>
            <form className="mt-[28px] flex flex-col gap-[20px] ">
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
                      name="firstname"
                      value={formValues.firstname}
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
                      name="lastname"
                      value={formValues.lastname}
                      onChange={handleInputChange}
                      className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                    />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <p className="text-[14px] font-medium text-[#1A1A1A]">
                    Email
                  </p>
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
                      name="phone_number"
                      value={formValues.phone_number}
                      onChange={handleInputChange}
                      className="w-full outline-none border-none text-[#667085] text-[16px] font-[400]"
                    />
                  </div>
                </label>
              </div>
              <p>
                {createContactErrorMessage && (
                  <span className="text-red-500">
                    {createContactErrorMessage}
                  </span>
                )}
              </p>
            </form>
          </div>
          <div className="self-end align-end flex items-center gap-3 justify-self-end ">
            <Button
              label="Cancel"
              onClick={onClose}
              className="rounded-[8px] border border-[#C1BFDO] hover:bg-[#eeeff0]"
            />
            <Button
              label={
                createContactLoading ? (
                  <div className="flex items-center gap-2 opacity-[.7]">
                    <div className="spinner" />
                    Updating...
                  </div>
                ) : (
                  "Save"
                )
              }
              onClick={handleSave}
              disabled={isSaveDisabled}
              className={`rounded-[8px] border border-[#C1BFDO] bg-[#383268] hover:bg-[#41397c] text-white`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
